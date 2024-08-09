import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductInput } from './dtos/create-product.input';
import { UpdateProductInput } from './dtos/update-product.input';
import { calcPromoPrice } from 'src/util/PromoPriceCalculator';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ) { }

    async create(data: CreateProductInput): Promise<Product> {
        const promoPrice = calcPromoPrice(data.price, data.category);
        const product = this.productRepository.create({ ...data, promoPrice });

        return this.productRepository.save(product);
    }

    async findAll(): Promise<Product[]> {
        return this.productRepository.find();
    }

    async findOne(id: number): Promise<Product> {
        return this.productRepository.findOneBy({ id });
    }

    async update(id: number, data: UpdateProductInput): Promise<Product> {
        const product = await this.findOne(id);

        // checks if there's category
        if (data.category) {
            // checks if the category changed
            if (data.category !== product.category) {
                data.promoPrice = calcPromoPrice(product.price, data.category);
            }
        }

        // checks if there's price changes
        if (data.price) {
            // checks if the price changed without changing the promotional one
            if (data.price !== product.price) {
                data.promoPrice = calcPromoPrice(data.price, product.category);
            }
        }

        Object.assign(product, data);

        return this.productRepository.save(product);
    }

    async remove(id: number): Promise<Product> {
        const product = await this.findOne(id);

        return this.productRepository.remove(product);
    }
}
