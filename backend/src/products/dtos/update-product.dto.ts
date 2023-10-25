import {
    IsString, IsOptional, IsNumber, IsEnum
} from 'class-validator';
import { ProductCategory } from 'src/util/ProductCategory';

export class UpdateProductDto {

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    color?: string;

    @IsOptional()
    @IsEnum(ProductCategory)
    category?: ProductCategory;

    @IsOptional()
    @IsNumber()
    price?: number;

    // when updating a product, it is allowed to change the promotional price
    @IsOptional()
    @IsNumber()
    promoPrice?: number;
}
