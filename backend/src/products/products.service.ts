import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Product) private productsRepository: Repository<Product>) { }

    create(productDto: CreateProductDto) {
        const product = this.productsRepository.create(productDto);

        // calculate and round promotional price based on the category
        switch (product.category) {
            case 'Smartphones':
                product.promoPrice = Number((product.price * 0.9745).toFixed(2)); // 2.55% discount
                break;
            case 'Furniture':
                product.promoPrice = Number((product.price * 0.97).toFixed(2)); // 3% discount
                break;
            case 'Electronics':
                product.promoPrice = Number((product.price * 0.957).toFixed(2)); // 4.3% discount
                break;
            case 'Appliances':
                product.promoPrice = Number((product.price * 0.95).toFixed(2)); // 5% discount
                break;
            case 'Refrigerators':
                product.promoPrice = Number((product.price * 0.925).toFixed(2)); // 7.5% discount
                break;
            default:
                throw new Error('Invalid product category');
        }

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
