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

  declare type ResponseStatus = "OK" | "DELAYED" | "ERROR"; // TODO add other response statuses

  declare interface StockHistoryResponse {
    ticker: string;
    queryCount: number;
    resultsCount: number;
    adjusted: boolean;
    results: StockHistoryTick[];
    status: ResponseStatus;
    request_id: string;
    count?: number;
  }

  declare interface StockSummary {
    ticker: string;
    name: string;
    market: string;
    locale: string;
    primary_exchange: string;
    type: string;
    active: boolean;
    currency_name: string;
    cik: string;
    composite_figi: string;
    share_class_figi: string;
    last_updated_utc: string;
  }

  declare interface StockSearchResponse {
    results: StockSummary[];
    status: ResponseStatus;
    request_id: string;
    count?: number;
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
    search(searchTerm: string): Promise<StockSearchResponse | TimeoutRejection>;
  }
}

declare type TimeoutRejection = {
  status: "TIMEOUT";
};