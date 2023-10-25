import {
    IsString, IsNotEmpty, IsNumber, IsEnum
} from 'class-validator';
import { ProductCategory } from 'src/util/ProductCategory';

export class CreateProductDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    color: string;

    @IsNotEmpty()
    @IsEnum(ProductCategory)
    category: ProductCategory;

    // when creating a product, theres no need to define the promotional prince,
    // since it is calculated automatically based on the category
    @IsNotEmpty()
    @IsNumber()
    price: number;
}
