const getRejectingPromise = (ms: number): Promise<TimeoutRejection> =>
  new Promise((_, rej) => setTimeout(() => rej({ status: "TIMEOUT" }), ms));

export const timeout = async <T>(
  promise: Promise<T>,
  ms: number
): Promise<T | TimeoutRejection | unknown> => {
  let timeoutID;
  try {
    const result = Promise.race([
      promise,
      new Promise((_, rej) => {
        timeoutID = setTimeout(() => rej({ status: "TIMEOUT" }), ms);
      }),
    ]);
    clearTimeout(timeoutID);
    return result as TimeoutRejection | T;
  } catch (e: unknown) {
    clearTimeout(timeoutID);
    return e;
  }
};

export const isISO8601Date = (dateString: string): boolean =>
  new RegExp(
    [
      "^20\\d{2}-",
      "(01|02|03|04|05|06|07|08|09|10|11|12)-",
      "(01|02|03|04|05|06|07|08|09|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31)$",
    ].join("")
  ).test(dateString);
