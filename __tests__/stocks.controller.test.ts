import { describe, expect, test } from "@jest/globals";
import StocksController from "../app/controllers/stocks/stocks.controller";
import StocksService from "../app/services/stocks";

describe("Stocks Controller", () => {
  test("Can read the development environment", () => {
    expect(new StocksController(StocksService).service).toBe("Hooray");
  });
});
