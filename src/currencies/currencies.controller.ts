import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';

@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Post()
  create(@Body() createCurrencyDto: CreateCurrencyDto) {
    return this.currenciesService.create(createCurrencyDto);
  }

  @Get()
  async findAll() {
    const docs = this.currenciesService.findAll();
    if (!docs) return [];

    return docs;
  }

  @Get('/exchange')
  async exchange(
    @Query('currencies') currencies: string,
    @Query('date') date: string,
  ) {
    if (!currencies) throw new BadRequestException('currency pair is required');

    const doc = await this.currenciesService.exchange(currencies, date);
    if (!doc) return [];

    return doc;
  }

  @Get('convert')
  async convert(
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('amount') amount: number,
    @Query('date') date: string,
    @Query('reversed') reversed: boolean,
  ) {
    if (!from || !to || !amount)
      throw new BadRequestException(
        "'from', 'to' and 'amount' are required fields",
      );

    const currencies: string = `${from},${to}`;
    const doc = await this.currenciesService.exchange(currencies, date);
    if (!doc) return [];

    if (!reversed) return { quote: doc, result: amount * doc.pairValue };

    return { quote: doc, result: amount / doc.pairValue };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const doc = await this.currenciesService.remove(id);
    if (!doc) return [];

    return doc;
  }
}
