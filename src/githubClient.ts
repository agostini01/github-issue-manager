import dotenv from "dotenv";
import { Octokit } from "@octokit/rest";

dotenv.config();

// Initialize Octokit with a personal access token
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export default octokit;
