import { Database as db } from "../db.js";
import INITIAL_DATA from "./initial_data.js";

const seed = async (): Promise<void> => {
  // drop existing
  console.log("Dropping existing LLM_response table.");
  await db.any(`
    DROP TABLE LLM_response;
  `);
  console.log("Existing LLM_response table dropped.");

  // create new
  console.log("Creating new table LLM_response.");
  await db.any(`
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
    ) VALUES ${INITIAL_DATA.map(
      ({ ticker_symbol, ticker_name, llm_insights }) =>
        `('${ticker_symbol}', '${ticker_name}', '${llm_insights}')`
    ).join(" ")}
  `);
  console.log("New table LLM_response created.");

  // disconnect
  await db.$pool.end();
  console.log("Success");
};

seed();
export { INITIAL_DATA };
