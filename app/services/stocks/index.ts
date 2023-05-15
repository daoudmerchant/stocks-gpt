import { StocksService } from "./stocks.service";
import { MockStocksService } from "./stocks.service.mock";

export default process.env.NODE_ENV === "production"
  ? StocksService
  : MockStocksService;
