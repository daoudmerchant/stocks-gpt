/// <reference path="../../types.d.ts" />

import { isISO8601Date, fetchWithTimeout } from "../../utils";

export class StocksService implements Stock.BaseStocksService {
  async getHistory({
    ticker,
    from,
    to,
  }: Stock.GetHistoryArguments): Promise<Stock.StockHistoryResponse> {
    if ([from, to].some((dateString) => !isISO8601Date(dateString))) {
      throw new Error("Invalid date - must be YYYY-MM-DD");
    }
    return fetchWithTimeout(
      `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${from}/${to}?adjusted=true&sort=asc&apiKey=${process.env.POLYGON_API_KEY}`
    ).then((res) => res.json());
  }
  async search(searchTerm: string): Promise<Stock.StockSearchResponse> {
    return fetchWithTimeout(
      `https://api.polygon.io/v3/reference/tickers?search=${searchTerm}&active=true&apiKey=${process.env.POLYGON_API_KEY}`
    ).then((res) => res.json());
  }
}
