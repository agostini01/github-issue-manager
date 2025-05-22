import octokit from "./githubClient";

async function listGitHubIssues() {
  try {
    const response = await octokit.issues.listForRepo({
      owner: "agostini01",
      repo: "github-issue-manager",
      state: "open",
    });

    console.log("Open Issues:");
    response.data.forEach((issue) => {
      console.log(`#${issue.number}: ${issue.title} (Created by: ${issue.user?.login})`);
    });
  } catch (error) {
    console.error("Error fetching issues:", error);
  }
}

listGitHubIssues();
