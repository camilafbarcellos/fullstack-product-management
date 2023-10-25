import { ProductCategory } from './ProductCategory';

export function isValidCategory(category: string): boolean {
  return Object.values(ProductCategory).includes(category as ProductCategory);
}
