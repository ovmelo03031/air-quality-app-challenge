import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class AirQuality extends Document {
  @Prop({ type: Date, required: true, unique: true })
  timestamp: Date;

  @Prop({ type: Number })
  co: number;

  @Prop({ type: Number })
  pt08S1: number;

  @Prop({ type: Number })
  nmhc: number;

  @Prop({ type: Number })
  benzene: number;

  @Prop({ type: Number })
  pt08S2: number;

  @Prop({ type: Number })
  nox: number;

  @Prop({ type: Number })
  pt08S3: number;

  @Prop({ type: Number })
  no2: number;

  @Prop({ type: Number })
  pt08S4: number;

  @Prop({ type: Number })
  pt08S5: number;

  @Prop({ type: Number })
  temperature: number;

  @Prop({ type: Number })
  relative_humidity: number;

  @Prop({ type: Number })
  absolute_humidity: number;
}

export const AirQualitySchema = SchemaFactory.createForClass(AirQuality);
