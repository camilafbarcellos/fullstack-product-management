import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    color: string;

    @Column()
    category: string;

    @Column()
    price: number;

    @Column()
    promoPrice: number;
}