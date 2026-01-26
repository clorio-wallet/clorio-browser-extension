# Clorio Browser Extension

<div align="center">

![License](https://img.shields.io/github/license/nerve-global/clorio-browser-extension?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

</div>

Welcome to **Clorio**, a modern, secure, and user-friendly browser extension for the **Mina Protocol**!

In the evolving landscape of Web3, Clorio stands as a gateway to the Mina ecosystem. It allows users to manage accounts, send transactions, and interact with zero-knowledge applications directly from their browser. Clorio is designed with a focus on security, simplicity, and a seamless user experience.

## Getting Started 🚀

### Prerequisite 📌

*   [Bun](https://bun.sh) (v1.2.13 or higher)
*   [Node.js](https://nodejs.org/) (v18 or higher)

### Installation 💻

Make sure you're on the latest Bun version.

1.  **Install the dependencies:**

    ```bash
    bun install
    ```
    *Note: If you encounter issues, you can try `npm install --legacy-peer-deps`.*

2.  **Configure environment variables:**

    From the root directory, create a `.env` file (copy `.env.example` if available) and adjust the variables:

    ```env
    VITE_API_URL=https://api.clorio.client
    ```

3.  **Build the extension:**

    ```bash
    bun run build
    ```

## Structure 🏗️

This repository contains the source code for the Clorio browser extension.

*   `src`
    *   `api` - API clients and Axios configuration.
    *   `components` - Reusable UI components (Wallet, Settings, etc.).
    *   `hooks` - Custom React hooks.
    *   `lib` - Utilities, crypto functions, and validations.
    *   `pages` - Main application pages (Dashboard, Send, etc.).
    *   `popup` - Extension entry point.
    *   `stores` - Global state management using Zustand.
    *   `styles` - Global CSS and Tailwind configuration.

## Development 🛠️

Set up the development server for the extension:

*   **Chrome / Chromium:**
    ```bash
    bun run dev
    ```

*   **Firefox:**
    ```bash
    bun run dev:firefox
    ```

## Testing 🧪

*   **Run linter:**
    ```bash
    bunx eslint .
    ```

*   **Run unit tests:**
    ```bash
    bunx vitest
    ```

## Contributing 🤝

We welcome contributions! Please feel free to open issues or submit pull requests to improve Clorio.

1.  Fork the repository.
2.  Create a branch for your feature (`git checkout -b feature/NewFeature`).
3.  Commit your changes (`git commit -m 'Add NewFeature'`).
4.  Push the branch (`git push origin feature/NewFeature`).
5.  Open a Pull Request.

## Links 🌍

*   [Clorio Website](https://clor.io) - The official website of Clorio.
*   [Mina Protocol](https://minaprotocol.com) - The world's lightest blockchain.
