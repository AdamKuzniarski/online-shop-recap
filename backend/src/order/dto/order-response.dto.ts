import { ProductResponseDto } from '../../products/dto/product-response.dto';
import { CustomerResponseDto } from '../../customer/dto/customer-response.dto';

export class OrderResponseDto {
  id: number;
  products: ProductResponseDto[];
  totalPrice: number;       // dynamisch berechnet
  customer: CustomerResponseDto;
}
