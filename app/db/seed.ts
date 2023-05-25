import { Database as db } from "./db.js";

const SEED_DATA = [
  {
    ticker_symbol: "AAPL",
    ticker_name: "Apple Inc.",
    response_text: "This is a test.",
  },
];

const seed = async (): Promise<void> => {
  // drop existing
  console.log("Dropping existing table LLM_response.");
  await db.any(`
    DROP TABLE IF EXISTS LLM_response;
  `);
  console.log("Existing table LLM_response dropped.");

  // create new
  console.log("Creating new table LLM_response.");
  await db.any(`
    CREATE TABLE LLM_response (
      ticker_id serial PRIMARY KEY,
      ticker_symbol VARCHAR ( 4 ) UNIQUE NOT NULL,
      ticker_name TEXT UNIQUE NOT NULL,
      response_text TEXT UNIQUE NOT NULL,
      timestamp TIMESTAMP NOT NULL DEFAULT NOW()
    );
    INSERT INTO LLM_response (
      ticker_symbol,
      ticker_name,
      response_text
    ) VALUES ${SEED_DATA.map(
      ({ ticker_symbol, ticker_name, response_text }) =>
        `('${ticker_symbol}', '${ticker_name}', '${response_text}')`
    ).join(" ")}
  `);
  console.log("New table LLM_response created.");

  // disconnect
  await db.$pool.end();
  console.log("Success");
};

seed();
