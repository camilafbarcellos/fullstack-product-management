import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { isValidCategory } from 'src/util/CategoryValidator';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) { }

    @Post()
    async createProduct(@Body() product: CreateProductDto) {
        // category validator
        if (!isValidCategory(product.category)) {
            throw new BadRequestException('Invalid product category');
        }

        return this.productsService.create(product);
    }

    @Get()
    async getProducts() {
        return await this.productsService.findAll();
    }

    @Get(':id')
    async getProduct(@Param('id') id: string) {
        const product = await this.productsService.findOne(parseInt(id));
        if (!product) {
            throw new NotFoundException('Product not found');
        }

        return product;
    }

    @Put(':id')
    async updateProduct(@Param('id') id: string, @Body() body: UpdateProductDto) {
        const product = await this.productsService.findOne(parseInt(id));
        if (!product) {
            throw new NotFoundException('Product not found');
        }

        return this.productsService.update(parseInt(id), body);
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id: string) {
        return this.productsService.remove(parseInt(id));
    }
}