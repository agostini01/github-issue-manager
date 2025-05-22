import octokit from "./githubClient";
import { OpenAI } from "openai";

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_API_BASE,
});

async function labelIssuesWithLLM() {
  try {
    // Fetch open issues from the repository
    const response = await octokit.issues.listForRepo({
      owner: "agostini01", // Replace with your GitHub username
      repo: "github-issue-manager", // Replace with your repository name
      state: "open",
    });

    for (const issue of response.data) {
      if (issue.body) {
        console.log(`Analyzing issue #${issue.number}: ${issue.title}`);

        // Use OpenAI to suggest labels based on the issue description
        const completion = await openai.completions.create({
          model: process.env.OPENAI_MODEL || "text-davinci-003", // Use the model from the .env file or fallback
          prompt: `Suggest appropriate labels for the following GitHub issue description:\n\n"${issue.body}"\n\nLabels:`,
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
