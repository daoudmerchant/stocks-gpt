import { describe, expect, test } from "@jest/globals";
import StocksController from "../app/controllers/stocks/stocks.controller";
import { MOCK_TICKER } from "../app/services/stocks/stocks.service.mock";

describe("Stocks Controller", () => {
  test("Can call the stocks service", async () => {
    expect(
      await StocksController.getStockHistorySummary(MOCK_TICKER)
    ).toBeDefined();
    expect(
      async () => await StocksController.getStockHistorySummary("GOOGL")
    ).rejects.toBeInstanceOf(Error);
  });
});
