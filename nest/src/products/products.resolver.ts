import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { pubSub } from 'src/utils/pubSub.utils';

@Resolver(() => Product)
export class ProductsResolver {
    constructor(private readonly productsService: ProductsService) {}

    @Subscription(() => Product, {
        // filter: (payload, variables) =>
        //     payload.commentAdded.title === variables.title,
    })
    productAdded() {
        return pubSub.asyncIterator('productAdded');
    }

    @Mutation(() => Product)
    async createProduct(@Args('createProductInput') createProductInput: CreateProductInput) {
        const product = await this.productsService.create(createProductInput);
        pubSub.publish('productAdded', { productAdded: product });
        return product;
    }

    @Query(() => [Product], { name: 'products' })
    findAll() {
        return this.productsService.findAll();
    }

    @Query(() => Product, { name: 'product' })
    findOne(@Args('_id', { type: () => String }) _id: string) {
        return this.productsService.findOne(_id);
    }

    @Mutation(() => Product)
    updateProduct(@Args('updateProductInput') updateProductInput: UpdateProductInput) {
        return this.productsService.update(
            updateProductInput._id,
            updateProductInput,
        );
    }

    @Mutation(() => Product)
    removeProduct(@Args('_id', { type: () => String }) _id: string) {
        return this.productsService.remove(_id);
    }
}
