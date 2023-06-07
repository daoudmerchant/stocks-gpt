import {
  afterAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";
import db from "../app/db";
import DatabaseService from "../app/services/db.service";
import { getSeedString, INITIAL_DATA } from "../app/db/seed/seed_data";
import { IMemoryDb, newDb } from "pg-mem";

let mDb: IMemoryDb;

const seedMock = (stocksArray?: Database.InitialData[]): void => {
  mDb.public.many(getSeedString(stocksArray));
};

const getDateAtDaysFromToday = (days: number): Date => {
  const today = new Date();
  const date = new Date();
  date.setDate(today.getDate() + days);
  return date;
};

const YESTERDAY = getDateAtDaysFromToday(-1);
const TOMORROW = getDateAtDaysFromToday(1);

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
  afterAll(() => {
    dbService.endConnectionPool();
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
      expect(RESPONSE_DATA.timestamp).toBeInstanceOf(Date);
    });
    test("Returns empty array if no stock found", () => {
      seedMock();
      return expect(dbService.getStock("Oops")).resolves.toHaveLength(0);
    });
    test("Adds a new stock", async () => {
      jest.useFakeTimers().setSystemTime(YESTERDAY);
      seedMock();
      jest.setSystemTime(TOMORROW);

      const NEW_STOCK = {
        tickerSymbol: "AMZN",
        tickerName: "Amazon.com Inc.",
        llmString: "Amazon is a big company I guess.",
      };
      const result = await dbService.saveStock(NEW_STOCK);

      expect(result.status).toBe("SUCCESS");

      const [saved] = await dbService.getStock(NEW_STOCK.tickerSymbol);

      expect(saved.ticker_symbol).toBe(NEW_STOCK.tickerSymbol);
      expect(saved.ticker_name).toBe(NEW_STOCK.tickerName);
      expect(saved.llm_insights).toBe(NEW_STOCK.llmString);
      expect(saved.timestamp).toStrictEqual(TOMORROW);

      jest.useRealTimers();
    });
    test("Updates a stock if already existing", async () => {
      jest.useFakeTimers().setSystemTime(YESTERDAY);
      seedMock();

      expect(
        (await dbService.getStock(APPLE_STOCK_DATA.ticker_symbol))[0].timestamp
      ).toStrictEqual(YESTERDAY);

      jest.setSystemTime(TOMORROW);

      const APPLE_UPDATE = {
        tickerSymbol: APPLE_STOCK_DATA.ticker_symbol,
        tickerName: APPLE_STOCK_DATA.ticker_name,
        llmString: "Apple is a very big company and you should buy its stock.",
      };
      const result = await dbService.saveStock(APPLE_UPDATE);

      expect(result.status).toBe("SUCCESS");

      const [saved] = await dbService.getStock(APPLE_STOCK_DATA.ticker_symbol);

      expect(saved.ticker_symbol).toBe(APPLE_STOCK_DATA.ticker_symbol);
      expect(saved.llm_insights).toBe(APPLE_UPDATE.llmString);
      expect(saved.timestamp).toStrictEqual(TOMORROW);

      jest.useRealTimers();
    });
    test("Ignores new stock name if stock symbol already existing", async () => {
      seedMock();
      await dbService.saveStock({
        tickerSymbol: APPLE_STOCK_DATA.ticker_symbol,
        tickerName: "I WANT THIS TO BE IGNORED AND NOT SAVED TO DB",
        llmString: "Apple is a very big company and you should buy its stock.",
      });

      const [saved] = await dbService.getStock(APPLE_STOCK_DATA.ticker_symbol);

      expect(saved.ticker_name).toBe(APPLE_STOCK_DATA.ticker_name);
    });
  });
});
