import pgPromise from "pg-promise";
import pg from "pg-promise/typescript/pg-subset";

export const MockDatabase = {} as pgPromise.IDatabase<{}, pg.IClient>; // FIX
