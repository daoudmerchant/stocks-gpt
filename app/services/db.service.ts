import pgPromise from "pg-promise";
import pg from "pg-promise/typescript/pg-subset";
import db from "../db";

/// <reference path="../types.d.ts" />

class DatabaseService implements Database.BaseDatabaseService {
  private db: pgPromise.IDatabase<{}, pg.IClient>;
  constructor(db: pgPromise.IDatabase<{}, pg.IClient>) {
    this.db = db;
  }
  async getStock(ticker: string): Promise<Database.StockInsightsResponse> {
    try {
      // TODO Wrap in timeout call?
      const rows = (await this.db.any(`
        SELECT * FROM LLM_response WHERE ticker_symbol = '${ticker}';
      `)) as Database.GetStockResponse[];
      if (rows.length > 1) {
        throw new Error("Ticker symbols must be unique on database.");
      }
      const [result] = rows;
      return this.formatStockRow(result);
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
  private formatStockRow(
    row: Database.GetStockResponse
  ): Database.StockInsightsResponse {
    return {
      ticker: row.ticker_symbol,
      string: row.response_text,
      timestamp: row.timestamp.getTime(),
    };
  }
}

export default new DatabaseService(db);
