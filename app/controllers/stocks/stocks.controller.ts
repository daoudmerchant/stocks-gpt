import { ChatGPTQuery, StockEvent } from "../../models/ChatGPTQuery.model";
import StocksService from "../../services/stocks";

const STOCK_EVENT_MAP: { [K in keyof StockHistoryTick]?: string } = {
  v: "trading volume",
  vw: "volume weighted average price",
  o: "open price",
  c: "close price",
  h: "highest price",
  l: "lowest price",
  n: "number of transactions in the aggregate window",
};

interface StocksControllerArguments {
  stocksService: StockService;
}

class StocksController {
  private stocksService: StockService;
  constructor({ stocksService }: StocksControllerArguments) {
    this.stocksService = stocksService;
  }

  public async getStockHistorySummary(ticker: string) {
    // const existingHistory = await this.dbService.getHistory(ticker);
    // if (existingHistory !== undefined) {
    //   TODO handle non-existant / from yesterday
    //   return existingHistory;
    // }
    const latestHistory = await this.stocksService.getHistory({
      ticker,
      from: this.getFormattedDate(-1),
      to: this.getFormattedDate(),
    });
    if (latestHistory !== undefined) {
      // await this.dbService.saveHistory(latestHistory);
      return new ChatGPTQuery({
        ticker: "AAPL",
        topic: "stock history activity",
      })
        .pushActivity(latestHistory.results)
        .getQuery();
    }
    // if (existingHistory.date === yesterday) {
    //   return existingHistory;
    // }
    // TODO handle doesn't exist
  }

  private getFormattedDate(relativeYears?: number = 0): string {
    const date = new Date();
    date.setFullYear(date.getFullYear() + relativeYears);
    return date.toLocaleDateString("fr-CA");
  }
}

export default new StocksController({
  stocksService: new StocksService(),
});
