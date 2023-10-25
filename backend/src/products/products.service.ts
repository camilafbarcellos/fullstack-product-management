import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { calcPromoPrice } from 'src/util/PromoPriceCalculator';

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Product) private productsRepository: Repository<Product>) { }

    create(productDto: CreateProductDto) {
        const promoPrice = calcPromoPrice(productDto.price, productDto.category);
        const product = this.productsRepository.create({ ...productDto, promoPrice });

        return this.productsRepository.save(product);
    }

    findAll(): Promise<Product[]> {
        return this.productsRepository.find();
    }

    findOne(id: number): Promise<Product> {
        return this.productsRepository.findOneBy({ id });
    }

    async update(id: number, productDto: UpdateProductDto) {
        const product = await this.findOne(id);
        if (!product) {
            throw new NotFoundException('Product not found');
        }

        // checks if the category changed
        if (productDto.category !== product.category) {
            productDto.promoPrice = calcPromoPrice(productDto.price, productDto.category);
        }

        // checks if the price changed without changing the promotional one
        if (productDto.price !== product.price && productDto.promoPrice === product.promoPrice) {
            productDto.promoPrice = calcPromoPrice(productDto.price, product.category);
        }

        Object.assign(product, productDto);

        return this.productsRepository.save(product);
    }

    async remove(id: number) {
        const product = await this.findOne(id);
        if (!product) {
            throw new NotFoundException('Product not found');
        }

        return this.productsRepository.remove(product);
    }
}
