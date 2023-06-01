export const INITIAL_DATA = [
  {
    ticker_symbol: "AAPL",
    ticker_name: "Apple Inc.",
    llm_insights: "This is a test.",
  },
];

// TODO Fix type declaration unrecognised with ts-node
export const getSeedString = (stockArray = INITIAL_DATA) => `
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
