import {
  afterEach,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";
import DatabaseService from "../app/services/db.service";
import { SEED_STRING, INITIAL_DATA } from "../app/db/seed/initial_data";
import { newDb } from "pg-mem";
import db from "../app/db";

jest.mock("../app/db", () => {
  const db = newDb();
  db.public.many(SEED_STRING);
  return {
    any: jest.fn((query: string) => db.public.many(query)),
    $pool: {
      end: jest.fn(),
    },
  };
});

describe("Database Service", () => {
  let dbService: DatabaseService;
  beforeEach(() => {
    dbService = new DatabaseService(db);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe("getStock()", () => {
    test("Gets a stock", async () => {
      const [APPLE_STOCK_DATA] = INITIAL_DATA;
      const RESPONSE_DATA = await dbService.getStock(
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
