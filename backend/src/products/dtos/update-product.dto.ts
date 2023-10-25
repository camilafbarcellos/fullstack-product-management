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

    // ao alterar um produto, é permitido mudar o valor promocional
    @IsOptional()
    @IsNumber()
    promoPrice?: number;
}
