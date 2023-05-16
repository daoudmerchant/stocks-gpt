import StocksService from "../../services/stocks";

interface StocksControllerArguments {
  stocksService: StockService;
}

class StocksController {
  private stocksService: StockService;
  constructor({ stocksService }: StocksControllerArguments) {
    this.stocksService = stocksService;
  }

  async getStockHistorySummary(ticker: string) {
    // const existingHistory = await this.dbService.getHistory(ticker);
    // if (existingHistory !== undefined) {
    //   TODO handle non-existant / from yesterday
    //   return existingHistory;
    // }
    const latestHistory = this.stocksService.getHistory(ticker);
    if (latestHistory !== undefined) {
      // await this.dbService.saveHistory(latestHistory);
      return latestHistory;
    }
    // if (existingHistory.date === yesterday) {
    //   return existingHistory;
    // }
    // TODO handle doesn't exist
  }
}

export default new StocksController({
  stocksService: new StocksService(),
});
