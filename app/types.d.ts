declare namespace Stock {
  declare interface StockHistoryTick {
    v: number; // The trading volume of the symbol in the given time period.
    vw: number; // The volume weighted average price.
    o: number; // The open price for the symbol in the given time period.
    c: number; // The close price for the symbol in the given time period.
    h: number; // The highest price for the symbol in the given time period.
    l: number; // The lowest price for the symbol in the given time period.
    t: number; // The Unix Msec timestamp for the start of the aggregate window.
    n: number; // The number of transactions in the aggregate window.
  }

  declare interface StockHistoryResponse {
    ticker: string;
    queryCount: number;
    resultsCount: number;
    adjusted: boolean;
    results: StockHistoryTick[];
    status: "OK"; // TODO add other response statuses
    request_id: string;
    count: number;
  }

  declare interface GetHistoryArguments {
    ticker: string;
    from: string;
    to: string;
  }

  declare class StockService {
    getHistory({
      ticker,
      from,
      to,
    }: GetHistoryArguments): Promise<StockHistoryResponse | TimeoutRejection>;
  }
}

declare type TimeoutRejection = {
  status: "TIMEOUT";
};
