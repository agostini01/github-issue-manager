import octokit from "./githubClient";
import { IssueManager, IssueContext } from "./mcp";

async function createGitHubIssue() {
  // Define the issue context
  const issueContext: IssueContext = {
    title: "Sample Issue Title",
    body: "This is a sample issue created using the GitHub Issue Manager.",
    labels: ["bug"],
    assignees: [],
  };

  // Initialize the IssueManager with the context
  const issueManager = new IssueManager(issueContext);

  try {
    // Use Octokit to create the issue
    const response = await octokit.issues.create({
      owner: "your-github-username", // Replace with your GitHub username
      repo: "your-repo-name", // Replace with your repository name
      title: issueManager.getContext().title,
      body: issueManager.getContext().body,
      labels: issueManager.getContext().labels,
      assignees: issueManager.getContext().assignees,
    });

    console.log("Issue created successfully:", response.data.html_url);
  } catch (error) {
    console.error("Error creating issue:", error);
  }
}

createGitHubIssue();
