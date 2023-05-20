import pgPromise from "pg-promise";
import { AppConfig } from "../config";
import pg from "pg-promise/typescript/pg-subset";

export const Database: pgPromise.IDatabase<{}, pg.IClient> = pgPromise({
  // TODO remove or improve connect and disconnect methods
  connect(e) {
    const cp = e.client.connectionParameters;
    console.log("Connected to database:", cp.database);
  },
  disconnect(e) {
    const cp = e.client.connectionParameters;
    console.log("Disconnecting from database:", cp.database);
  },
})(AppConfig.pgConfig);
