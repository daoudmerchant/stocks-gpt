import { describe, expect, test } from "@jest/globals";
import { isISO8601Date } from "../app/utils";

describe("Utils", () => {
  describe("isISO8601Date()", () => {
    test("returns true for a correct ISO8601 date", () => {
      ["2022-01-19", "2046-12-04", "2001-10-31"].every((dateString) =>
        expect(isISO8601Date(dateString)).toBe(true)
      );
    });
  });
});
