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
- **OpenAI**: For integrating AI capabilities.

## Setup Instructions

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Rename `.env.EXAMPLE` to `.env` and fill in your personal access token.
4. Run the application scripts:
   ```bash
   npx ts-node src/<script name>.ts
   ```

## Devcontainer and Local LLM Setup

This project includes a `.devcontainer` directory for setting up a development environment using Visual Studio Code. It allows you to run the application in a containerized environment with all dependencies pre-installed.

### Local LLM Setup

To run the application with a local LLM, you need to set up the environment variables in your `.env` file. It is possible to access a local LLM server running on your host machine from within the devcontainer. This is done by using `host.docker.internal` as the hostname.

```
GITHUB_TOKEN="YOUR GITHUB TOKEN"
OPENAI_API_BASE="http://host.docker.internal:1234/v1"
OPENAI_MODEL=<The model you want to use>
```

**Important Note**: Your local LLM server must be compatible with the OpenAI API. LMStudio is a great option for this. You can find more information about LMStudio [here](https://lmstudio.ai/docs/app/api).

## Purpose

This project serves as a learning tool to understand:

1. How to use GitHub Agent Mode for API interactions.
2. How to implement and utilize MCPs for managing application contexts.

## Next Steps

- Implement CLI commands for managing GitHub issues.
- Add tests to validate functionality.
- Expand MCPs to support additional GitHub features.
