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
    return this.currencyModel
      .find()
      .select('-createdAt -updatedAt -__v')
      .lean()
      .exec();
  }

  exchange(currencies: string, date: string) {
    const [baseCurrency, pairCurrency] = currencies.split(',');

    if (!date)
      return this.currencyModel
        .findOne({ baseCurrency, pairCurrency })
        .select('-createdAt -updatedAt -__v')
        .lean()
        .sort({ createdAt: -1 })
        .limit(1);

    return this.currencyModel
      .findOne({ baseCurrency, pairCurrency, date: new Date(date) })
      .select('-createdAt -updatedAt -__v')
      .lean()
      .limit(1);
  }

  async remove(id: string) {
    return await this.currencyModel.findOneAndDelete({ _id: id });
  }
}
