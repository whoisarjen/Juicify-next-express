import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './entities/product.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    ) {}

    async create(createProductInput: CreateProductInput) {
        return await this.productModel.create(createProductInput);
    }

    async findAll() {
        return await this.productModel.find().sort({ _id: -1 }).limit(10);
    }

    findOne(_id: string) {
        return `This action returns a #${_id} product`;
    }

    update(_id: string, updateProductInput: UpdateProductInput) {
        return `This action updates a #${_id} product`;
    }

    async remove(_id: string) {
        await this.productModel.deleteOne({ _id });
        return { _id };
    }
}
