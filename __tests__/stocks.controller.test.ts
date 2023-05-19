import { describe, expect, test } from "@jest/globals";
import StocksController from "../app/controllers/stocks/stocks.controller";
import { MOCK_TICKER } from "../app/services/stocks/stocks.service.mock";
import { NOT_FOUND } from "../app/models/errors/NotFoundError.model";
describe("Stocks Controller", () => {
  test("Handles existing tickers", async () => {
    expect(
      StocksController.getStockHistorySummary(MOCK_TICKER)
    ).resolves.toBeDefined();
  });
  test("Handles non-existent tickers", () => {
    expect(
      StocksController.getStockHistorySummary("GOOGL")
    ).rejects.toThrowError(NOT_FOUND);
  });
});
