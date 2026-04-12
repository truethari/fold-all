# Fold All

Fold and unfold all functions and methods in the current file with one click - directly from the editor title bar.

Marketplace: [Fold All - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=truethari.foldall)

## Features

- Adds a **fold icon** to the editor title bar
- **One click to fold** all functions and methods in the current file
- **Click again to unfold** them all
- Works with any language that provides a Document Symbol Provider (TypeScript, JavaScript, Python, Go, Rust, Java, C/C++, and more)
- Automatically resets when switching to a different file

## Usage

Open any source file and click the fold icon ( ☰ ) in the editor title bar (top right area).

- **First click** - folds all functions, methods, and constructors
- **Second click** - unfolds them all
- **Switch file** - state resets automatically

## Supported Symbol Types

- Functions
- Methods
- Constructors
- Arrow functions

## Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository on GitHub
2. **Clone** your fork locally
   ```bash
   git clone https://github.com/truethari/fold-all.git
   cd fold-all
   ```
3. **Install dependencies**
   ```bash
   bun install
   ```
4. **Make your changes** in `src/extension.ts`
5. **Build** to verify there are no errors
   ```bash
   bun run build
   ```
6. **Test** the extension by pressing `F5` in VS Code to launch an Extension Development Host
7. **Commit** your changes and open a **Pull Request** against the `main` branch

Please keep PRs focused — one feature or fix per PR.

## Requirements

- VS Code `^1.115.0`
- A language extension that provides Document Symbols (most popular language extensions do this out of the box)

## License

[MIT](LICENSE)
