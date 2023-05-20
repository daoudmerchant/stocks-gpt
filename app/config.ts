const TIMEOUT_DURATION = 5000;

export const AppConfig = {
  // TODO put config elsewhere?
  timeout: TIMEOUT_DURATION,
  pgConfig: {
    connectionString: process.env.POSTGRES_URI,
    query_timeout: TIMEOUT_DURATION,
  },
};
