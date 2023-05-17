/// <reference path="stocks.service.d.ts" />

import { TimeoutRejection, timeout } from "@/app/utils";

export class StocksService implements StockService {
  async getHistory({
    ticker,
    from,
    to,
  }: GetHistoryArguments): Promise<StockHistoryResponse | TimeoutRejection> {
    if (
      [from, to].some(
        (dateString) => !/^(19|20)\d{2}-(0|1)\d-(0|1|2|3)\d$/.test(dateString)
      )
    ) {
      throw new Error("Invalid date - must be YYYY-MM-DD");
    }
    return timeout(
      fetch(
        `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/year/${today.toLocaleDateString(
          "fr-CA"
        )}/${from}/${to}?apiKey=${process.env.POLYGON_API_KEY}`
      ).then((res) => res.json()),
      5000
    );
  }
}
