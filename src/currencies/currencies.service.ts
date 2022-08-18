import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Currency, CurrencyDocument } from './schemas/currency.schema';
import { CreateCurrencyDto } from './dto/create-currency.dto';

@Injectable()
export class CurrenciesService {
  constructor(
    @InjectModel(Currency.name) private currencyModel: Model<CurrencyDocument>,
  ) {}

  async create(createCurrencyDto: CreateCurrencyDto): Promise<Currency> {
    const newExchange = new this.currencyModel(createCurrencyDto);
    return newExchange.save();
  }

  async findAll(): Promise<Currency[]> {
    return this.currencyModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} currency`;
  }

  remove(id: number) {
    return `This action removes a #${id} currency`;
  }
}
