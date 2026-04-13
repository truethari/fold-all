import * as vscode from "vscode";

let isFolded = false;

export function activate(context: vscode.ExtensionContext) {
  const foldCommand = vscode.commands.registerCommand("oneClickFold.toggleFold", async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }

    const symbols = await vscode.commands.executeCommand<vscode.DocumentSymbol[]>(
      "vscode.executeDocumentSymbolProvider",
      editor.document.uri
    );

    if (!symbols || symbols.length === 0) {
      vscode.window.showInformationMessage("No symbols found in this document.");
      return;
    }

    const functionKinds = new Set([
      vscode.SymbolKind.Function,
      vscode.SymbolKind.Method,
      vscode.SymbolKind.Constructor,
    ]);

    const functionRanges = collectFunctionRanges(symbols, functionKinds, editor.document);

    if (functionRanges.length === 0) {
      vscode.window.showInformationMessage("No functions or methods found in this document.");
      return;
    }

    if (!isFolded) {
      await foldRanges(editor, functionRanges);
      isFolded = true;
    } else {
      await unfoldRanges(editor, functionRanges);
      isFolded = false;
    }
  });

  context.subscriptions.push(foldCommand);

  // Reset fold state when active editor changes
  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(() => {
      isFolded = false;
    })
  );
}

const ARROW_FUNCTION_RE = /=>|=\s*(async\s*)?\(/;

function isArrowFunction(symbol: vscode.DocumentSymbol, document: vscode.TextDocument): boolean {
  if (symbol.kind !== vscode.SymbolKind.Variable) {
    return false;
  }
  const declarationLine = document.lineAt(symbol.range.start.line).text;
  return ARROW_FUNCTION_RE.test(declarationLine);
}

function collectFunctionRanges(
  symbols: vscode.DocumentSymbol[],
  functionKinds: Set<vscode.SymbolKind>,
  document: vscode.TextDocument
): vscode.Range[] {
  const ranges: vscode.Range[] = [];

  for (const symbol of symbols) {
    if (functionKinds.has(symbol.kind) || isArrowFunction(symbol, document)) {
      ranges.push(symbol.range);
    }
    if (symbol.children && symbol.children.length > 0) {
      ranges.push(...collectFunctionRanges(symbol.children, functionKinds, document));
    }
  }

  return ranges;
}

async function foldRanges(editor: vscode.TextEditor, ranges: vscode.Range[]): Promise<void> {
  // Sort by start line descending so nested folds work correctly
  const sorted = [...ranges].sort((a, b) => b.start.line - a.start.line);

  for (const range of sorted) {
    await editor.edit(() => {}); // flush pending edits
    await vscode.commands.executeCommand("editor.fold", {
      selectionLines: [range.start.line],
      levels: 1,
    });
  }
}

async function unfoldRanges(editor: vscode.TextEditor, ranges: vscode.Range[]): Promise<void> {
  const sorted = [...ranges].sort((a, b) => a.start.line - b.start.line);

  for (const range of sorted) {
    await vscode.commands.executeCommand("editor.unfold", {
      selectionLines: [range.start.line],
      levels: 1,
    });
  }
}

export function deactivate() {}
