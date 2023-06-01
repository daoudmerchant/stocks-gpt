import pgPromise from "pg-promise";
import pg from "pg-promise/typescript/pg-subset";
import { DuplicateTickerError } from "../models/errors/DuplicateTickerError.model";

/// <reference path="../types.d.ts" />

class DatabaseService implements Database.BaseDatabaseService {
  private db: pgPromise.IDatabase<{}, pg.IClient>;
  constructor(db: pgPromise.IDatabase<{}, pg.IClient>) {
    this.db = db;
  }
  async getStock(tickerSymbol: string): Promise<Database.GetStockResponse[]> {
    // TODO Wrap in timeout call?
    const rows = (await this.db.any(`
        SELECT * FROM LLM_response WHERE ticker_symbol = '${tickerSymbol}';
      `)) as Database.GetStockResponse[];
    if (rows.length > 1) {
      throw new DuplicateTickerError();
    }
    return rows;
  }
  async saveStock({
    // TODO unify Database.GetStockResponse and Database.SaveStockArguments
    tickerSymbol,
    tickerName,
    llmString,
  }: Database.SaveStockArguments): Promise<Database.Success> {
    const rows = await this.db.any(`
        INSERT INTO LLM_response
        (
          ticker_symbol,
          ticker_name,
          llm_insights
        ) VALUES (
          '${tickerSymbol}',
          '${tickerName}',
          '${llmString}'
        )
        ON CONFLICT (ticker_symbol) DO UPDATE
        SET
          llm_insights = excluded.llm_insights,
          timestamp = NOW();
      `);
    console.log(rows);
    return { status: "SUCCESS" };
  }
  public endConnectionPool(): void {
    this.db.$pool.end();
  }
}

export default DatabaseService;
