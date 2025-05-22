// Define the Model Context Protocol (MCP) for GitHub issues

export interface IssueContext {
  title: string;
  body: string;
  labels?: string[];
  assignees?: string[];
}

export class IssueManager {
  private context: IssueContext;

  constructor(context: IssueContext) {
    this.context = context;
  }

  getContext(): IssueContext {
    return this.context;
  }

  setContext(context: IssueContext): void {
    this.context = context;
  }
}
