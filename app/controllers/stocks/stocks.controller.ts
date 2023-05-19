import StocksService from "../../services/stocks";
import { LLMQuery } from "../../models/LLMQuery.model";
import { NotFoundError } from "../../models/errors/NotFoundError.model";

interface StocksControllerArguments {
  stocksService: Stock.BaseStocksService;
}

class StocksController {
  private stocksService: Stock.BaseStocksService;
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

    if (latestHistory.status !== "OK" && latestHistory.status !== "DELAYED") {
      // await this.dbService.saveHistory(latestHistory);
      throw new Error("Not implemented");
    }
    if (latestHistory.results.length === 0) {
      throw new NotFoundError();
    }
    return new LLMQuery({
      ticker: "AAPL",
      topic: "stock history activity",
    })
      .pushActivity(latestHistory.results)
      .getQuery();

    // if (existingHistory.date === yesterday) {
    //   return existingHistory;
    // }
    // TODO handle doesn't exist
  }

  private getFormattedDate(relativeYears: number = 0): string {
    const date = new Date();
    date.setFullYear(date.getFullYear() + relativeYears);
    return date.toLocaleDateString("fr-CA");
  }
}

export default new StocksController({
  stocksService: new StocksService(),
});
