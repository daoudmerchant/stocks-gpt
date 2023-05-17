export interface StockEvent {
  priceType: string;
  timestamp: number;
  value: number;
}

export interface ChatGPTQueryArguments {
  ticker: string;
  topic: string;
}

export class LLMQuery {
  private query: string;
  constructor({ ticker, topic }: ChatGPTQueryArguments) {
    this.query = `Generate insights as a data scientist from the following ${topic} for ${ticker}. Only provide conclusions based on analysing this specific data set, not general market advice:`;
  }

  public add(string: string): LLMQuery {
    this.query = `${this.query}${string}`;
    return this;
  }

  public pushActivity(ticks: Stock.StockHistoryTick[]): LLMQuery {
    return this.add(
      ticks.map((tick) => this.describeStockTick(tick)).join("") + "\n"
    );
  }

  public getQuery(): string {
    // TODO add disclaimer method?
    return `${this.query}Do not add any disclaimers after having presented your insights.\n\n`;
  }

  private describeStockTick({ c, v, t }: Stock.StockHistoryTick): string {
    return `On ${new Date(
      t
    ).toDateString()}, the closing price was ${c} and the trading volume was ${v}.\n`;
  }
}
