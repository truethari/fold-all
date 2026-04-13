# Fold All

**Fold and unfold all functions and methods in the current file with one click — directly from the editor title bar.**

[![VS Code Marketplace](https://img.shields.io/badge/VS%20Code-Marketplace-007ACC?logo=visualstudiocode&logoColor=white)](https://marketplace.visualstudio.com/items?itemName=truethari.foldall)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/truethari/fold-all/blob/main/LICENSE)
[![GitHub](https://img.shields.io/badge/GitHub-truethari%2Ffold--all-181717?logo=github&logoColor=white)](https://github.com/truethari/fold-all)

---

<img src="https://raw.githubusercontent.com/truethari/fold-all/refs/heads/master/assets/sample.gif" alt="Fold All in action" width="800"/>

---

## How It Works

Click the **☰** icon in the editor title bar to toggle folding for all functions and methods in the current file.

| Action       | Result                                         |
| ------------ | ---------------------------------------------- |
| First click  | Folds all functions, methods, and constructors |
| Second click | Unfolds them all                               |
| Switch file  | State resets automatically                     |

---

## Features

- One-click fold/unfold toggle in the **editor title bar**
- Works with **any language** that has a Document Symbol Provider
- Handles **nested** functions and methods correctly
- Supports **arrow functions** in TypeScript and JavaScript
- Zero configuration required

---

## Supported Languages

Any language with a Document Symbol Provider, including:

TypeScript &nbsp;·&nbsp; JavaScript &nbsp;·&nbsp; Python &nbsp;·&nbsp; Go &nbsp;·&nbsp; Rust &nbsp;·&nbsp; Java &nbsp;·&nbsp; C / C++ &nbsp;·&nbsp; C# &nbsp;·&nbsp; PHP &nbsp;·&nbsp; Ruby &nbsp;·&nbsp; and more

---

## Supported Symbol Types

- Functions
- Methods
- Constructors
- Arrow functions (`const fn = () => {}`)

---

## Requirements

- VS Code `1.115.0` or later

---

## Contributing

Contributions are welcome! To get started:

1. Fork the [repository](https://github.com/truethari/fold-all)
2. Clone your fork and install dependencies
   ```bash
   git clone https://github.com/your-username/fold-all.git
   cd fold-all
   bun install
   ```
3. Make your changes in `src/extension.ts`
4. Build and verify
   ```bash
   bun run build
   ```
5. Press `F5` in VS Code to launch an Extension Development Host and test
6. Open a Pull Request against the `main` branch

---

## License

[MIT](https://github.com/truethari/fold-all/blob/main/LICENSE) © [Tharindu N. Madhusankha](https://github.com/truethari)
