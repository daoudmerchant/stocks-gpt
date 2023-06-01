import pgPromise from "pg-promise";
import pg from "pg-promise/typescript/pg-subset";

const Database: pgPromise.IDatabase<{}, pg.IClient> = pgPromise({
  // TODO remove or improve connect and disconnect methods
  // connect(e) {
  //   const cp = e.client.connectionParameters;
  //   console.log("Connected to database:", cp.database);
  // },
  // disconnect(e) {
  //   const cp = e.client.connectionParameters;
  //   console.log("Disconnecting from database:", cp.database);
  // },
})({
  connectionString: process.env.POSTGRES_URI,
  query_timeout: 5000,
});

export default Database;
