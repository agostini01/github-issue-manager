import octokit from "./githubClient";
import { OpenAI } from "openai";

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_API_BASE,
});

async function listLabels() {
  try {
    const response = await octokit.issues.listLabelsForRepo({
      owner: "agostini01", // Replace with your GitHub username
      repo: "github-issue-manager", // Replace with your repository name
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching labels:", error);
    return [];
  }
}

async function labelIssuesWithLLM() {
  try {
    // Fetch open issues from the repository
    const response = await octokit.issues.listForRepo({
      owner: "agostini01", // Replace with your GitHub username
      repo: "github-issue-manager", // Replace with your repository name
      state: "open",
    });

    // Filter issues with the label 'triage'
    const triageIssues = response.data.filter(issue => issue.labels?.some(label => typeof label !== "string" && label.name === "triage"));

    // Fetch available labels from the repository
    const availableLabels = await listLabels();
    // remove the 'triage' label from the available labels
    const triageLabel = availableLabels.find(label => label.name === "triage");
    const availableLabelsWithoutTriage = availableLabels.filter(label => label.name !== "triage");
    const labelsString = availableLabelsWithoutTriage.map(label => `${label.name}: ${label.description}`).join("\n");

    for (const issue of triageIssues) {
      if (issue.body) {
        console.log(`Analyzing issue #${issue.number}: ${issue.title}`);

        // Use OpenAI to suggest labels based on the issue description
        const completion = await openai.completions.create({
          model: process.env.OPENAI_MODEL || "text-davinci-003", // Use the model from the .env file or fallback
          prompt: `Suggest appropriate labels for the following GitHub issue description:\n\n"${issue.body}"\n\nAvailable labels:\n${labelsString}\n\nLabels:`,
          max_tokens: 50,
        });

        const suggestedLabels = completion.choices[0].text?.trim().split(",").map(label => label.trim());
        console.log(`Suggested labels for issue #${issue.number}:`, suggestedLabels);

        // Update the issue with the suggested labels
        //   await octokit.issues.update({
        //     owner: "your-github-username", // Replace with your GitHub username
        //     repo: "your-repo-name", // Replace with your repository name
        //     issue_number: issue.number,
        //     labels: suggestedLabels,
        //   });

        console.log(`Labels updated for issue #${issue.number}`);
      } else {
        console.log(`No labels suggested for issue #${issue.number}`);
      }
    }
  } catch (error) {
    console.error("Error labeling issues:", error);
  }
}

labelIssuesWithLLM();
