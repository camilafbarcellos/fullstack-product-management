import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ProductCategory } from 'src/util/ProductCategory';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

registerEnumType(ProductCategory, {
    name: 'ProductCategory',
    description: 'The supported categories.',
});

@Entity() // TypeORM entity
@ObjectType() // GraphQL object
export class Product {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    @Column()
    @Field()
    name: string;

    @Column()
    @Field()
    description: string;

    @Column()
    @Field()
    color: string;

    // category controlled by enum
    @Column({ enum: ProductCategory })
    @Field(() => ProductCategory)
    category: ProductCategory;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    @Field()
    price: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    @Field()
    promoPrice: number;
}