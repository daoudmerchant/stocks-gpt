/// <reference path="stocks.service.d.ts" />
import fs from "fs/promises";
import path from "path";

export const MOCK_TICKER = "AAPL";

export class MockStocksService implements StockService {
  async getHistory(ticker: string): Promise<StockHistoryResponse> {
    if (ticker !== MOCK_TICKER) {
      throw new Error("Unknown ticker - not implemented");
    }
    return fs
      .readFile(path.resolve(__dirname, "./aapl-sample-response.json"))
      .then((buffer) => JSON.parse(buffer.toString()));
  }
}
