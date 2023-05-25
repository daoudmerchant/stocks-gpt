import { describe, expect, test } from "@jest/globals";
import DatabaseService from "../app/services/db.service";

describe("Database Service", () => {
  describe("getStock()", () => {
    test("Gets a stock", () => {
      expect(DatabaseService.getStock("AAPL")).resolves.toBe({});
    });
  });
});
