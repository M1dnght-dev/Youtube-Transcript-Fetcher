# YouTube Transcript Fetcher

<!-- Table of Contents -->
## Table of Contents
- [YouTube Transcript Fetcher](#youtube-transcript-fetcher)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Features](#features)
  - [Download](#download)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Steps](#steps)
  - [Usage](#usage)
  - [Development](#development)
  - [Technologies Used](#technologies-used)
  - [Contributing](#contributing)
  - [License](#license)
  - [Author](#author)
  - [Acknowledgments](#acknowledgments)

## Overview
YouTube Transcript Fetcher is a simple and user-friendly Electron application that allows you to fetch and save transcripts from YouTube videos. Perfect for content creators, researchers, and anyone who needs to extract text easily.

---

## Features

- **Easy Transcript Fetching:** Retrieve transcripts using a YouTube video URL or Video ID.
- **Local Saving:** Save transcripts as `.txt` files.
- **Intuitive UI:** Clean design built with TailwindCSS.
- **Cross-Platform Support:** Available for Windows, macOS, and Linux.

---

## Download

Download the latest version from the [Releases](https://github.com/zyztem/youtube-transcript-fetcher/releases) page.

**Available Platforms:**
- **Windows:** `.exe` installer
- **macOS:** `.pkg` installer
- **Linux:** `.deb` package

---

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/) (recommended)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/zyztem/youtube-transcript-fetcher.git
   cd youtube-transcript-fetcher
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the application:
   ```bash
   pnpm start
   ```
4. Build for production:
   ```bash
   pnpm build
   ```

---

## Usage

1. Open the app.
2. Enter a YouTube video URL or Video ID.
3. Click the "Fetch Transcript" button.
4. Choose a location to save the transcript (.txt file).

---

## Development

**File Structure:**
- **src/**: Contains the main application code.
  - `index.js`: Main process logic.
  - `preload.js`: Exposes APIs to the renderer process.
  - `index.html`: UI for the renderer process.
- **dist/**: Output directory for production builds.

**Scripts:**
- `pnpm start`: Run the app in development mode.
- `pnpm build`: Build the app for production.

---

## Technologies Used

- **Electron:** Desktop application framework.
- **TailwindCSS:** Styling the user interface.
- **Node.js:** Backend logic.
- **youtube-transcript:** Fetching YouTube transcripts.

---

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch.
3. Commit your changes.
4. Push to your branch and open a pull request.

---

## License

This project is licensed under the MIT License.

---

## Author

Zyztem

---

## Acknowledgments

Thanks to the creators of the youtube-transcript library for making transcript fetching easy. Inspired by the need for accessible YouTube transcripts.