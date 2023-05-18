/// <reference path="../../types.d.ts" />

import { AppConfig } from "../../../app/config";
import { isISO8601Date, timeout } from "../../utils";

export class StocksService implements Stock.BaseStocksService {
  async getHistory({
    ticker,
    from,
    to,
  }: Stock.GetHistoryArguments): Promise<
    Stock.StockHistoryResponse | TimeoutError
  > {
    if ([from, to].some((dateString) => !isISO8601Date(dateString))) {
      throw new Error("Invalid date - must be YYYY-MM-DD");
    }
    return timeout(
      fetch(
        `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${from}/${to}?adjusted=true&sort=asc&apiKey=${process.env.POLYGON_API_KEY}`
      ).then((res) => res.json()),
      AppConfig.timeout
    );
  }
  async search(
    searchTerm: string
  ): Promise<Stock.StockSearchResponse | TimeoutError> {
    return timeout(
      fetch(
        `https://api.polygon.io/v3/reference/tickers?search=${searchTerm}&active=true&apiKey=${process.env.POLYGON_API_KEY}`
      ).then((res) => res.json()),
      AppConfig.timeout
    );
  }
}
