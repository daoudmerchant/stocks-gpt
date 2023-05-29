import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import DatabaseService from "../app/services/db.service";
import { getSeedString } from "../app/db/seed/utils";
import INITIAL_DATA from "../app/db/seed/initial_data";
import db from "../app/db";
import { IMemoryDb, newDb } from "pg-mem";

let mDb: IMemoryDb;

const seedMock = (stocksArray?: Database.InitialData[]): void => {
  mDb.public.many(getSeedString(stocksArray));
};

jest.mock("../app/db", () => {
  return {
    any: jest.fn((query: string) => mDb.public.many(query)),
    $pool: {
      end: jest.fn(),
    },
  };
});

const [APPLE_STOCK_DATA] = INITIAL_DATA;

describe("Database Service", () => {
  const dbService = new DatabaseService(db);
  beforeEach(() => {
    mDb = newDb();
  });
  describe("getStock()", () => {
    test("Gets a stock", async () => {
      seedMock();
      const [RESPONSE_DATA] = await dbService.getStock(
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
    test("Returns empty array if no stock found", () => {
      seedMock();
      expect(dbService.getStock("Oops")).resolves.toHaveLength(0);
    });
  });
});
