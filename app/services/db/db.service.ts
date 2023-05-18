import { AppConfig } from "@/app/config";
import pgPromise from "pg-promise";
import pg from "pg-promise/typescript/pg-subset";

export class DatabaseService extends Database.BaseDatabaseService {
  private db: pgPromise.IDatabase<{}, pg.IClient>;
  constructor() {
    super();
    this.db = pgPromise({
      // TODO remove or improve connect and disconnect methods
      connect(e) {
        const cp = e.client.connectionParameters;
        console.log("Connected to database:", cp.database);
      },
      disconnect(e) {
        const cp = e.client.connectionParameters;
        console.log("Disconnecting from database:", cp.database);
      },
    })({
      connectionString: process.env.POSTGRES_URI,
      query_timeout: AppConfig.timeout,
    });
  }
  getStock({
    ticker,
    type,
    string,
  }: Database.StockDatabaseArguments): Promise<
    Database.StockInsightsResponse | TimeoutError
  > {
    throw new Error("Not implemented.");
  }
  saveStock({
    ticker,
    type,
    string,
  }: Database.StockDatabaseArguments): Promise<
    Database.Success | TimeoutError
  > {
    throw new Error("Not implemented.");
  }
}
