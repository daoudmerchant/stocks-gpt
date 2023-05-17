import { describe, expect, test } from "@jest/globals";
import { isISO8601Date } from "../app/utils";

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
      test("Invalid date", () => {
        expect(isISO8601Date("2122-01-19")).toBe(false);
        expect(isISO8601Date("2022-13-19")).toBe(false);
        expect(isISO8601Date("2022-01-91")).toBe(false);
      });
    });
  });
});
