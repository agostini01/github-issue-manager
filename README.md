# GitHub Issue Manager

## Project Overview
The **GitHub Issue Manager** is a TypeScript-based application designed to interact with GitHub repositories using the GitHub API. It demonstrates the use of **GitHub Agent Mode** and **Model Context Protocols (MCPs)** to manage GitHub issues efficiently.

## Features
- Authenticate with GitHub using a personal access token.
- Create, list, and close GitHub issues.
- Define and manage issue contexts using MCPs.

## Technologies Used
- **TypeScript**: For type-safe development.
- **Octokit**: GitHub API client for Node.js.
- **dotenv**: For managing environment variables.

## Setup Instructions
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your GitHub personal access token:
   ```env
   GITHUB_TOKEN=your_personal_access_token_here
   ```
4. Run the application (instructions to be added as the project progresses).

## Purpose
This project serves as a learning tool to understand:
1. How to use GitHub Agent Mode for API interactions.
2. How to implement and utilize MCPs for managing application contexts.

## Next Steps
- Implement CLI commands for managing GitHub issues.
- Add tests to validate functionality.
- Expand MCPs to support additional GitHub features.
