export class CreateCurrencyDto {
  readonly baseCurrency: string;
  readonly baseValue: number;
  readonly pairCurrency: string;
  readonly pairValue: number;
  readonly date: Date;
}
