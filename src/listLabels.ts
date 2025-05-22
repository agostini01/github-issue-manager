import octokit from "./githubClient";

async function listLabels() {
  try {
    const response = await octokit.issues.listLabelsForRepo({
      owner: "agostini01", // Replace with your GitHub username
      repo: "github-issue-manager", // Replace with your repository name
    });

    const labels = response.data.map(label => ({
      name: label.name,
      description: label.description || "No description available",
    }));

    return labels;
  } catch (error) {
    console.error("Error fetching labels:", error);
    return [];
  }
}

listLabels().then(labels => {
  console.log("Available Labels:");
  labels.forEach(label => {
    console.log(`- ${label.name}: ${label.description}`);
  });
});
