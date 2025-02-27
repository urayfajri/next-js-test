# Next.js + Tailwind CSS + TypeScript Starter and Boilerplate

<div align="center">
  <h2>🔋 ts-nextjs-tailwind-starter</h2>
  <p>Next.js + Tailwind CSS + TypeScript starter packed with useful development features.</p>
</div>

## Features

This repository is 🔋 battery packed with:

- ⚡️ Next.js 14 with App Router
- ⚛️ React 18
- ✨ TypeScript
- 💨 Tailwind CSS 3 — Configured with CSS Variables to extend the **primary** color
- 💎 Pre-built Components — Components that will **automatically adapt** with your brand color, [check here for the demo](https://tsnext-tw.thcl.dev/components)
- 🃏 Jest — Configured for unit testing
- 📈 Absolute Import and Path Alias — Import components using `@/` prefix
- 📏 ESLint — Find and fix problems in your code, also will **auto sort** your imports
- 💖 Prettier — Format your code consistently
- 🐶 Husky & Lint Staged — Run scripts on your staged files before they are committed
- 🤖 Conventional Commit Lint — Make sure you & your teammates follow conventional commit
- ⏰ Release Please — Generate your changelog by activating the `release-please` workflow
- 👷 Github Actions — Lint your code on PR
- 🚘 Automatic Branch and Issue Autolink — Branch will be automatically created on issue **assign**, and auto linked on PR
- 🔥 Snippets — A collection of useful snippets
- 👀 Open Graph Helper Function — Awesome open graph generated using [og](https://github.com/theodorusclarence/og), fork it and deploy!
- 🗺 Site Map — Automatically generate sitemap.xml
- 📦 Expansion Pack — Easily install common libraries, additional components, and configs.

## Requirement

### 1. Tools

- Install Node JS and NPM
- Install PNPM
- Browser
- VS Code

### 2. VS Code Extension Recommendation

- VS Code Extension JavaScript and TypeScript Nightly
- VS Code Extension Auto Import
- VS Code Extension ESLint
- VS Code Extension Headwind
- VS Code Extension Tailwind CSS Intellisense
- VS Code Extension ES7 + React/Redux/React-Native Snippets

## Getting Started

### 1. Install dependencies

It is encouraged to use **pnpm** so the husky hooks can work properly.

```bash
pnpm install
```

### 3. Run the development server

You can start the server using this command:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing the page by modifying `src/pages/index.tsx`.

### 3. Environment Variables

Jika ingin mengubah API URL untuk aplikasi, buat file .env.local dari .env.example

**NOTE: untuk keperluan development gunakan api dev (tanpa disetting env repo ini mengarah ke api dev)**

## Rules

### 1. Commit Message Convention

This repository follows [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/)

#### Format

`<type>(optional scope): <description>`
Contoh: `feat(dashboard): add button`

#### Type for Semantic Versioning (ex. feat commit message)

- feat: lorem ipsum → will trigger release please to up minor version (1.0.0) to (1.1.0)
- fix: error when blablabla → will trigger release please to up patch version (1.0.0) to (1.0.1)
- feat!: adjust ui design → will trigger release please to up major version (1.0.0) to (2.0.0)
