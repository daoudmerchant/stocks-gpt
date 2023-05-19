export const TIMEOUT = "TIMEOUT";

export class TimeoutError extends Error {
  constructor() {
    super(TIMEOUT);
    this.name = "TimeoutError";
  }
}
