export class TimeoutError extends Error {
  public readonly status: "TIMEOUT" = "TIMEOUT";
}
