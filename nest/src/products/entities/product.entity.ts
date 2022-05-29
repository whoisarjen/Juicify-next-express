import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
@ObjectType()
export class Product {
  @Field(() => String, { description: '_id of product' })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  @Field(() => String, { description: 'Name of product' })
  name: string;

  @Prop({ nullable: true })
  @Field(() => Float, {
    nullable: true,
    description: 'Number of grams per 100g/ml',
  })
  p?: number;

  @Prop({ nullable: true })
  @Field(() => Float, {
    nullable: true,
    description: 'Number of grams per 100g/ml',
  })
  c?: number;

  @Prop({ nullable: true })
  @Field(() => Float, {
    nullable: true,
    description: 'Number of grams per 100g/ml',
  })
  f?: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
