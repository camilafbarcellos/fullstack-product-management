import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { CreateProductInput } from './dtos/create-product.input';
import { UpdateProductInput } from './dtos/update-product.input';
import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { isValidCategory } from 'src/util/CategoryValidator';

@Resolver()
export class ProductResolver {
    constructor(
        private productService: ProductService
    ) { }

    @Mutation(() => Product)
    async createProduct(@Args('data') data: CreateProductInput): Promise<Product> {
        // category validator
        if (!isValidCategory(data.category)) {
            throw new BadRequestException('Invalid product category');
        }

        const newProduct = await this.productService.create(data);
        if (!newProduct) {
            throw new InternalServerErrorException('Error while creating product');
        }

        return newProduct;
    }

    @Query(() => [Product])
    async findAllProducts(): Promise<Product[]> {
        const products = await this.productService.findAll();
        if (!products) {
            throw new InternalServerErrorException('Error while creating product');
        }

        return products;
    }

    @Query(() => Product)
    async findProduct(@Args('id') id: number): Promise<Product> {
        const product = await this.productService.findOne(id);
        if (!product) {
            throw new NotFoundException('Product not found');
        }

        return product;
    }

    @Mutation(() => Product)
    async updateProduct(@Args('id') id: number, @Args('data') data: UpdateProductInput): Promise<Product> {
        const product = await this.productService.findOne(id);
        if (!product) {
            throw new NotFoundException('Product not found');
        }

        // category validator
        if (data.category) {
            if (!isValidCategory(data.category)) {
                throw new BadRequestException('Invalid product category');
            }
        }

        const updatedProduct = await this.productService.update(id, data);
        if (!updatedProduct) {
            throw new InternalServerErrorException('Error while updating product');
        }

        return updatedProduct;
    }

    @Mutation(() => Product)
    async deleteProduct(@Args('id') id: number): Promise<Product> {
        const product = await this.productService.findOne(id);
        if (!product) {
            throw new NotFoundException('Product not found');
        }

        const deletedProduct = await this.productService.remove(id);
        if (!deletedProduct) {
            throw new InternalServerErrorException('Error while deleting product');
        }

        return deletedProduct;
    }
}