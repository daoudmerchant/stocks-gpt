import { beforeAll, describe, expect, jest, test } from "@jest/globals";
import { isISO8601Date, timeout } from "../app/utils";
import { TIMEOUT } from "../app/models/errors/TimeoutError.model";

describe("Utils", () => {
  describe("isISO8601Date()", () => {
    test("returns true for a correct ISO8601 date", () => {
      ["2022-01-19", "2046-12-04", "2001-10-31"].every((dateString) =>
        expect(isISO8601Date(dateString)).toBe(true)
      );
    });
    describe("returns false for an incorrect ISO8601 date", () => {
      test("Not a date", () => {
        expect(isISO8601Date("I love cheesecake")).toBe(false);
      });
      test("Not the right order", () => {
        expect(isISO8601Date("19-01-2022")).toBe(false);
      });
      test("Not hyphenated", () => {
        expect(isISO8601Date("2022/01/19")).toBe(false);
      });
      test("Not to correct number of digits", () => {
        expect(isISO8601Date("2022-1-19")).toBe(false);
      });
      test("Non-existent date", () => {
        expect(isISO8601Date("2122-01-19")).toBe(false);
        expect(isISO8601Date("2022-13-19")).toBe(false);
        expect(isISO8601Date("2022-01-91")).toBe(false);
      });
    });
  });

  const TIMEOUT_TEST_RESULT = "TEST_RESULT";

  let testTimeoutID: NodeJS.Timeout;

  describe("timeout()", () => {
    beforeAll(() => {
      jest.useFakeTimers();
    });
    test("Resolves argument if argument resolves before timeout", () => {
      expect(timeout(getPromise("resolve", 1000), { ms: 2000 })).resolves.toBe(
        TIMEOUT_TEST_RESULT
      );
    });
    test("Rejected argument if argument rejects before timeout", () => {
      expect(timeout(getPromise("reject", 1000), { ms: 2000 })).rejects.toBe(
        TIMEOUT_TEST_RESULT
      );
    });
    test("TimeoutError if argument resolves after timeout", () => {
      expect(
        timeout(getPromise("resolve", 2000), { ms: 1000 })
      ).rejects.toThrowError(TIMEOUT);
    });
    test("TimeoutError if argument rejects after timeout", () => {
      expect(
        timeout(getPromise("reject", 2000), { ms: 1000 })
      ).rejects.toThrowError(TIMEOUT);
    });
    function getPromise(
      method: "reject" | "resolve",
      ms: number
    ): Promise<typeof TIMEOUT_TEST_RESULT> {
      return new Promise((resolve, reject) => {
        const args = { resolve, reject };
        testTimeoutID = setTimeout(() => args[method](TIMEOUT_TEST_RESULT), ms);
      });
    }
  });
});
