import { Customer } from "./customer";
import { Product } from "./product";

export type Order = {
  id: number;
  products: Product[];
  price: number;
  totalPrice: number;
  customer: Customer;
};
