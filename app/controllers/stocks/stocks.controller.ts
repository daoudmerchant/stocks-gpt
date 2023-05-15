export default class StocksController {
  constructor(private readonly stocksService: string) {}

  get service() {
    return this.stocksService;
  }
}
