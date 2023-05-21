import { Database as db } from "./db.js";

const seed = async (): Promise<void> => {
  // drop existing
  console.log("Dropping existing table LLM_response.");
  await db.any("DROP TABLE LLM_response");
  console.log("Existing table LLM_response dropped.");

  // create new
  console.log("Creating new table LLM_response.");
  await db.any(`
    CREATE TABLE LLM_response (
      ticker_id serial PRIMARY_KEY
      ticker_name VARCHAR ( 4 ) UNIQUE NOT NULL
      response_text TEXT UNIQUE NOT NULL
      timestamp TIMESTAMP NOT NULL
    )
  `);
  console.log("New table LLM_response created.");
};

seed();
