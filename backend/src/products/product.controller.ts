import { BadRequestException, Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductInput } from './dtos/create-product.input';
import { UpdateProductInput } from './dtos/update-product.input';
import { isValidCategory } from 'src/util/CategoryValidator';

@Controller('products')
export class ProductController {
    constructor(
        private productService: ProductService
    ) { }

    @Post()
    async createProduct(@Body() data: CreateProductInput) {
        // category validator
        if (!isValidCategory(data.category)) {
            throw new BadRequestException('Invalid product category');
        }

        const newProduct = await this.productService.create(data);
        if (!newProduct) {
            return new InternalServerErrorException('Error while creating product');
        }

        return newProduct;
    }

    @Get()
    async getProducts() {
        const products = await this.productService.findAll();
        if (!products) {
            return new InternalServerErrorException('Error while getting products');
        }

        return products;
    }

    @Get(':id')
    async getProduct(@Param('id') id: string) {
        const product = await this.productService.findOne(parseInt(id));
        if (!product) {
            throw new NotFoundException('Product not found');
        }

        return product;
    }

    @Put(':id')
    async updateProduct(@Param('id') id: string, @Body() data: UpdateProductInput) {
        const product = await this.productService.findOne(parseInt(id));
        if (!product) {
            throw new NotFoundException('Product not found');
        }

        // category validator
        if (data.category) {
            if (!isValidCategory(data.category)) {
                throw new BadRequestException('Invalid product category');
            }
        }

        const updatedProduct = await this.productService.update(parseInt(id), data);
        if (!updatedProduct) {
            return new InternalServerErrorException('Error while updating product');
        }

        return updatedProduct;
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id: string) {
        const product = await this.productService.findOne(parseInt(id));
        if (!product) {
            throw new NotFoundException('Product not found');
        }

        const deletedProduct = await this.productService.remove(parseInt(id));
        if (!deletedProduct) {
            return new InternalServerErrorException('Error while deleting product');
        }

        return deletedProduct;
    }
}