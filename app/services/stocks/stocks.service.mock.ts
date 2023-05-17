/// <reference path="../../types.d.ts" />

import fs from "fs/promises";
import path from "path";

export const MOCK_TICKER = "AAPL";

export class MockStocksService implements Stock.StockService {
  async getHistory(
    args: Stock.GetHistoryArguments
  ): Promise<Stock.StockHistoryResponse> {
    if (args.ticker !== MOCK_TICKER) {
      throw new Error("Unknown ticker - not implemented");
    }
    return fs
      .readFile(path.resolve(__dirname, "./aapl-sample-response.json"))
      .then((buffer) => JSON.parse(buffer.toString()));
  }
}
