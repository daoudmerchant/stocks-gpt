export const DUPLICATE_TICKER = "DUPLICATE_TICKER";

export class DuplicateTickerError extends Error {
  constructor() {
    super(DUPLICATE_TICKER);
    this.name = "NotFoundError";
  }
}
