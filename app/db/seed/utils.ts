import INITIAL_DATA from "./initial_data";

export const getSeedString = (
  stockArray: Database.InitialData[] = INITIAL_DATA
) => `
CREATE TABLE LLM_response (
  ticker_id serial PRIMARY KEY,
  ticker_symbol VARCHAR ( 4 ) UNIQUE NOT NULL,
  ticker_name TEXT UNIQUE NOT NULL,
  llm_insights TEXT UNIQUE NOT NULL,
  timestamp TIMESTAMP NOT NULL DEFAULT NOW()
);
INSERT INTO LLM_response (
  ticker_symbol,
  ticker_name,
  llm_insights
) VALUES ${stockArray
  .map(
    ({ ticker_symbol, ticker_name, llm_insights }) =>
      `('${ticker_symbol}', '${ticker_name}', '${llm_insights}')`
  )
  .join(", ")}
`;
