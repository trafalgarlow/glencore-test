import { Omit } from 'utility-types';


export interface Product {
  id: number;
  name: string;
  price: number;
  dictionary: number;
}

export type ProductToInsert = Omit<Product, 'id'>;
