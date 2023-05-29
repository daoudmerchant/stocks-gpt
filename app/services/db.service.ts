import pgPromise from "pg-promise";
import pg from "pg-promise/typescript/pg-subset";
import { DuplicateTickerError } from "../models/errors/DuplicateTickerError.model";

/// <reference path="../types.d.ts" />

class DatabaseService implements Database.BaseDatabaseService {
  private db: pgPromise.IDatabase<{}, pg.IClient>;
  constructor(db: pgPromise.IDatabase<{}, pg.IClient>) {
    this.db = db;
  }
  async getStock(ticker: string): Promise<Database.GetStockResponse[]> {
    try {
      // TODO Wrap in timeout call?
      const rows = (await this.db.any(`
        SELECT * FROM LLM_response WHERE ticker_symbol = '${ticker}';
      `)) as Database.GetStockResponse[];
      if (rows.length > 1) {
        throw new DuplicateTickerError();
      }
      return rows;
    } catch (e) {
      console.log(e); // TODO Handle
    } finally {
      this.db.$pool.end();
    }
    throw new Error("Not implemented");
  }
  async saveStock({
    ticker,
    type,
    string,
  }: Database.SaveStockArguments): Promise<Database.Success> {
    throw new Error("Not implemented.");
  }
}

export default DatabaseService;
