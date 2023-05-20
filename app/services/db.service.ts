import pgPromise from "pg-promise";
import pg from "pg-promise/typescript/pg-subset";

export class DatabaseService extends Database.BaseDatabaseService {
  private db: pgPromise.IDatabase<{}, pg.IClient>;
  constructor(db: pgPromise.IDatabase<{}, pg.IClient>) {
    super();
    this.db = db;
  }
  getStock({
    ticker,
    type,
    string,
  }: Database.StockDatabaseArguments): Promise<Database.StockInsightsResponse> {
    throw new Error("Not implemented.");
  }
  saveStock({
    ticker,
    type,
    string,
  }: Database.StockDatabaseArguments): Promise<Database.Success> {
    throw new Error("Not implemented.");
  }
}
