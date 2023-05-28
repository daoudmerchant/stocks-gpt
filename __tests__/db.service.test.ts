import { describe, expect, test } from "@jest/globals";
import DatabaseService from "../app/services/db.service";
import INITIAL_DATA from "../app/db/seed/initial_data";

describe("Database Service", () => {
  describe("getStock()", () => {
    test("Gets a stock", async () => {
      const [APPLE_STOCK_DATA] = INITIAL_DATA;
      const RESPONSE_DATA = await DatabaseService.getStock(
        APPLE_STOCK_DATA.ticker_symbol
      );
      (
        [
          "ticker_name",
          "ticker_symbol",
          "llm_insights",
        ] as (keyof Database.InitialData)[]
      ).forEach((key) => {
        expect(APPLE_STOCK_DATA[key]).toBe(RESPONSE_DATA[key]);
      });
    });
  });
});
