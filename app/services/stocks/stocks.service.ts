/// <reference path="stocks.service.d.ts" />

export class StocksService implements StockService {
  async getHistory(ticker: string): Promise<StockHistoryResponse> {
    throw new Error("Not implemented");
  }
}
