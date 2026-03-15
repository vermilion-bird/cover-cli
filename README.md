# cover-cli

🎨 A CLI tool to generate beautiful social media cover images from text.

## Features

- 📝 Generate cover images from command-line text
- 🎭 Multiple templates (minimal, tech, blog)
- 📐 Support for various social media sizes
- 🎨 Beautiful typography and automatic text wrapping
- 🌏 Full Chinese and multilingual support
- ⚡ Fast PNG generation using Satori and resvg

## Installation

### Prerequisites

- Node.js v16 or higher
- npm

### Linux / macOS

```bash
npm install
npm link
```

Or install globally:

```bash
npm install -g .
```

### Windows

1. Install Node.js from [nodejs.org](https://nodejs.org/) if not already installed

2. Open PowerShell or Command Prompt and navigate to the project directory:
```powershell
cd path\to\cover-cli
```

3. Install dependencies:
```powershell
npm install
```

4. Install globally:
```powershell
npm link
```
or
```powershell
npm install -g .
```

5. Test the installation:
```powershell
cover-cli "AI is changing the world"
```

**Windows Notes:**
- If you encounter execution policy errors in PowerShell, run:
  ```powershell
  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
  ```
- For proper Chinese character display, set UTF-8 encoding:
  ```powershell
  chcp 65001
  ```

## Usage

### Basic usage

```bash
cover-cli "AI is changing the world"
```

This generates `cover.png` in the current directory.

### Custom output filename

```bash
cover-cli "AI is changing the world" --output ai.png
```

### Choose a different size

```bash
cover-cli "AI is changing the world" --size twitter
```

Available sizes:
- `twitter` - 1200x630 (default)
- `blog` - 1200x630
- `square` - 1080x1080
- `xhs` - 1080x1440 (小红书)
- `youtube` - 1280x720

### Choose a template

```bash
cover-cli "AI is changing the world" --template tech
```

Available templates:
- `minimal` - Dark background with centered title (default)
- `tech` - Purple gradient with bold typography
- `blog` - Light background with title, subtitle, and footer

### Combine options

```bash
cover-cli "AI will change software development" --output dev.png --size youtube --template tech
```

## Examples

Generate a Twitter cover with minimal template:
```bash
cover-cli "Building the future of AI" --size twitter --template minimal
```

Generate a square image for Instagram:
```bash
cover-cli "Code. Learn. Repeat." --size square --template tech
```

Generate a blog header:
```bash
cover-cli "The Ultimate Guide to Node.js" --size blog --template blog
```

Generate Chinese text cover:
```bash
cover-cli "人工智能正在改变世界" --template tech
```

Generate mixed Chinese and English:
```bash
cover-cli "AI与人工智能的未来" --size square --template minimal
```

## Development

Run a test:
```bash
npm test
```

## Tech Stack

- [Satori](https://github.com/vercel/satori) - HTML/JSX to SVG rendering
- [@resvg/resvg-js](https://github.com/yisibl/resvg-js) - SVG to PNG conversion
- [Commander.js](https://github.com/tj/commander.js) - CLI argument parsing
- [Inter Font](https://rsms.me/inter/) - English typography
- [Noto Sans SC](https://fonts.google.com/noto/specimen/Noto+Sans+SC) - Chinese typography

## License

MIT
