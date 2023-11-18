import { IsString, IsNumber, IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCurrencyDto {
  @IsString()
  @IsNotEmpty()
  readonly baseCurrency: string;

  @IsNumber()
  @IsNotEmpty()
  readonly baseValue: number;

  @IsString()
  @IsNotEmpty()
  readonly pairCurrency: string;

  @IsNumber()
  @IsNotEmpty()
  readonly pairValue: number;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  readonly date: Date;
}
