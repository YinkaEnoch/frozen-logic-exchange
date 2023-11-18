import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CurrencyDocument = Currency & Document;

@Schema({ timestamps: true })
export class Currency {
  @Prop({ required: true, uppercase: true, trim: true })
  baseCurrency: string;

  @Prop({ required: true })
  baseValue: number;

  @Prop({ required: true, uppercase: true, trim: true })
  pairCurrency: string;

  @Prop({ required: true })
  pairValue: number;

  @Prop({ required: true })
  date: Date;
}

export const CurrencySchema = SchemaFactory.createForClass(Currency);
