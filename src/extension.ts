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
      vscode.SymbolKind.Interface,
    ]);

    const functionRanges = collectFunctionRanges(symbols, functionKinds);

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

// Fold any Variable symbol that spans multiple lines (arrow functions, object literals, etc.)
function isFoldableVariable(symbol: vscode.DocumentSymbol): boolean {
  return (
    symbol.kind === vscode.SymbolKind.Variable && symbol.range.end.line > symbol.range.start.line
  );
}

function collectFunctionRanges(
  symbols: vscode.DocumentSymbol[],
  functionKinds: Set<vscode.SymbolKind>
): vscode.Range[] {
  const ranges: vscode.Range[] = [];

  for (const symbol of symbols) {
    if (functionKinds.has(symbol.kind) || isFoldableVariable(symbol)) {
      ranges.push(symbol.range);
    }
    if (symbol.children && symbol.children.length > 0) {
      ranges.push(...collectFunctionRanges(symbol.children, functionKinds));
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
