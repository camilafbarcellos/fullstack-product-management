import { BadRequestException } from '@nestjs/common';
import { CategoryDiscounts } from './CategoryDiscounts';

export function calcPromoPrice(price: number, category: string): number {
  if (category in CategoryDiscounts) {
    const discount = CategoryDiscounts[category];
    return Number((price * (1 - discount)).toFixed(2));
  } else {
    throw new BadRequestException('Invalid product category');
  }
}
