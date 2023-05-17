export type TimeoutRejection = {
  status: "TIMEOUT";
};

const getRejectingPromise = (ms: number): Promise<TimeoutRejection> =>
  new Promise((_, rej) => setTimeout(() => rej({ status: "TIMEOUT" }), ms));

export const timeout = async <T>(
  promise: Promise<T>,
  ms: number
): Promise<T | TimeoutRejection> =>
  Promise.race([promise, getRejectingPromise(ms)]);
