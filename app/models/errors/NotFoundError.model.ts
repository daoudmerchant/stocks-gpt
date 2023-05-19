export const NOT_FOUND = "NOT_FOUND";

export class NotFoundError extends Error {
  constructor() {
    super(NOT_FOUND);
    this.name = "NotFoundError";
  }
}
