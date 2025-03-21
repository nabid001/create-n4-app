# create-n4-app

A CLI tool to bootstrap Next.js applications with the N4 stack configurations, including authentication and database setups.

[![npm version](https://img.shields.io/npm/v/create-n4-app.svg)](https://www.npmjs.com/package/create-n4-app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

`create-n4-app` allows you to quickly set up a Next.js project with various [authentication providers](#authentication) (Clerk, Auth.js) and [database options](#database-integration) (MongoDB, Drizzle with PostgreSQL), tailored to your specific needs through an interactive CLI.

> **Note**: This CLI tool is only available as an NPM package.

## Installation

```bash
npm install -g create-n4-app
```

Or use it directly with npx:

```bash
npx create-n4-app
```

## Usage

Run the command and follow the interactive prompts:

```bash
npx create-n4-app@latest
```

The CLI will guide you through the setup process, asking you to:

- Specify your project name
- Choose whether to include authentication
- Select an authentication provider (Clerk or Auth.js)
- If Auth.js is selected, choose between Credentials or OAuth authentication
- Decide whether to integrate a database
- Select a database type (MongoDB or Drizzle)
- If Drizzle is selected, choose a database provider (currently Neon PostgreSQL)

## Features

- **Simple Setup**: Interactive CLI for easy project configuration
- <a id="authentication"></a>**Authentication Options**:
  - **<a href="https://clerk.com/">Clerk </a>**: Full integration with Clerk authentication
  - **<a href="https://authjs.dev/">Auth.js </a>**: Setup with either Credentials or OAuth providers
- <a id="database-integration"></a>**Database Integration**:
  - **<a href="https://www.mongodb.com/">MongoDB</a>**: Setup with Mongoose
  - **<a href="https://orm.drizzle.team/">Drizzle ORM</a>**: SQL integration with Neon PostgreSQL

## Project Structure

After setup, your project will be configured with the selected options and dependencies already installed. The CLI handles all the necessary configuration steps automatically.

## Environment Variables

After installation, you'll need to set up environment variables for your selected services. The CLI will remind you of this step upon completion.

## Requirements

- Node.js >=14.16
- npm

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## Inspiration

I named my CLI project after Theo's `create-t3-app`

## License

MIT
