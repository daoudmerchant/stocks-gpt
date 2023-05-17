/// <reference path="../../types.d.ts" />

import { isISO8601Date, timeout } from "../../utils";

export class StocksService implements Stock.StockService {
  async getHistory({
    ticker,
    from,
    to,
  }: Stock.GetHistoryArguments): Promise<
    Stock.StockHistoryResponse | TimeoutRejection
  > {
    if ([from, to].some((dateString) => !isISO8601Date(dateString))) {
      throw new Error("Invalid date - must be YYYY-MM-DD");
    }
    return timeout(
      fetch(
        `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${from}/${to}?adjusted=true&sort=asc&apiKey=${process.env.POLYGON_API_KEY}`
      ).then((res) => res.json()),
      5000
    );
  }
}
