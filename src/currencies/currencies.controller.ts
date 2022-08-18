import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';

@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Post()
  create(@Body() createCurrencyDto: CreateCurrencyDto) {
    return this.currenciesService.create(createCurrencyDto);
  }

  @Get()
  findAll() {
    return this.currenciesService.findAll();
  }

  @Get('exchange')
  exchange(@Param('id') id: string) {
    return this.currenciesService.findOne(+id);
  }

  @Get('convert')
  convertPair() {}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.currenciesService.remove(+id);
  }
}
