import { Database } from "./db";
import { MockDatabase } from "./db.mock";

export default process.env.NODE_ENV === "test" ? Database : MockDatabase;
