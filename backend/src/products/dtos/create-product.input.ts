import { InputType } from '@nestjs/graphql';
import {
    IsString, IsNumber, IsEnum,
    IsOptional, IsNotEmpty
} from 'class-validator';
import { ProductCategory } from 'src/util/ProductCategory';

@InputType() // GraphQL input
export class CreateProductInput {

    @IsNotEmpty({message: 'Empty field must be filled'})
    @IsString()
    name: string;

    @IsNotEmpty({message: 'Empty field must be filled'})
    @IsString()
    description: string;

    @IsNotEmpty({message: 'Empty field must be filled'})
    @IsString()
    color: string;

    @IsNotEmpty({message: 'Empty field must be filled'})
    @IsEnum(ProductCategory)
    category: ProductCategory;

    // when creating a product, theres no need to define the promotional prince,
    // since it is calculated automatically based on the category
    @IsNotEmpty({message: 'Empty field must be filled'})
    @IsNumber()
    price: number;

    // when creating a product, it is allowed to change the promotional price
    @IsOptional()
    @IsNumber()
    promoPrice?: number;
}
