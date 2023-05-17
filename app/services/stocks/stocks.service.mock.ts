/// <reference path="../../types.d.ts" />

import fs from "fs/promises";
import path from "path";

export const MOCK_TICKER = "AAPL";
export const MOCK_NAME = "Apple Inc.";

const getNonExistentHistoryResponse = (
  ticker: string
): Stock.StockHistoryResponse => ({
  ticker,
  results: [],
  queryCount: 0,
  resultsCount: 0,
  adjusted: true,
  status: "OK",
  request_id: "9e0a89bc3ff1a117da7768170ddfa3c7",
});

const NON_EXISTENT_SEARCH_RESPONSE = {
  results: [],
  status: "OK" as Stock.ResponseStatus,
  request_id: "9e0a89bc3ff1a117da7768170ddfa3c7",
};

export class MockStocksService implements Stock.StockService {
  async getHistory({
    ticker,
  }: Stock.GetHistoryArguments): Promise<Stock.StockHistoryResponse> {
    if (ticker !== MOCK_TICKER) {
      return getNonExistentHistoryResponse(ticker);
    }
    return fs
      .readFile(path.resolve(__dirname, "./aapl-sample-response.json"))
      .then((buffer) => JSON.parse(buffer.toString()));
  }
  async search(searchTerm: string): Promise<Stock.StockSearchResponse> {
    if (!MOCK_TICKER.includes(searchTerm) && !MOCK_NAME.includes(searchTerm)) {
      return NON_EXISTENT_SEARCH_RESPONSE;
    }
    return fs
      .readFile(path.resolve(__dirname, "./aapl-history-response.json"))
      .then((buffer) => JSON.parse(buffer.toString()));
  }
}
