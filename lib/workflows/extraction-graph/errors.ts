export class WorkflowStepError extends Error {
  step: string;

  constructor(step: string, message: string) {
    super(message);
    this.name = 'WorkflowStepError';
    this.step = step;
  }
}
