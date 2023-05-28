import db from "../index.js";
import { SEED_STRING } from "./initial_data.js";

const seed = async (): Promise<void> => {
  // drop existing
  console.log("Dropping existing LLM_response table.");
  await db.any(`
    DROP TABLE LLM_response;
  `);
  console.log("Existing LLM_response table dropped.");

  // create new
  console.log("Creating new table LLM_response.");
  await db.any(SEED_STRING);
  console.log("New table LLM_response created.");

  // disconnect
  await db.$pool.end();
  console.log("Success");
};

seed();
