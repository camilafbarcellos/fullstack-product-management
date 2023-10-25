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

    // ao criar um produto, não é possível definir o valor promocional
    // pois ele é gerado automaticamente com base na categoria
    @IsNotEmpty()
    @IsNumber()
    price: number;
}
