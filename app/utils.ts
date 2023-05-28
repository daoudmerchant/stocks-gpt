import { AppConfig } from "./config";
import { TimeoutError } from "./models/errors/TimeoutError.model";
import { loadEnvConfig } from "@next/env";

export const loadTestEnvVariables = (): void => {
  // TODO remove before deployment
  const projectDir = process.cwd();
  loadEnvConfig(projectDir);
};

export const timeout = async <T>(
  promise: Promise<T>,
  options: TimeoutArgumentsOptions = { ms: AppConfig.timeout }
): Promise<T> => {
  const { ms, callbacks } = options;
  let timeoutID;
  try {
    const result = await Promise.race([
      promise,
      new Promise((_, rej) => {
        timeoutID = setTimeout(() => rej(new TimeoutError()), ms);
      }),
    ]);
    callbacks?.onResolve?.();
    return result as T;
  } catch (e: unknown) {
    // if (e instanceof TimeoutError) { // TOTO handle differently?
    //   throw e;
    // }
    callbacks?.onReject?.();
    throw e;
  } finally {
    clearTimeout(timeoutID);
    callbacks?.onFinished?.();
  }
};

export const fetchWithTimeout = (
  input: RequestInfo | URL,
  init: RequestInit = {}
): Promise<Response> => {
  const abortController = new AbortController();
  return timeout(fetch(input, { ...init, signal: abortController.signal }), {
    callbacks: { onReject: () => abortController.abort() },
  });
};

export const isISO8601Date = (dateString: string): boolean =>
  new RegExp(
    [
      "^20\\d{2}-",
      "(01|02|03|04|05|06|07|08|09|10|11|12)-",
      "(01|02|03|04|05|06|07|08|09|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31)$",
    ].join("")
  ).test(dateString);
