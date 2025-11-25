import { ProductResponseDto } from '../../products/dto/product-response.dto';
import { CustomerResponseDto } from '../../customer/dto/customer-response.dto';

export class OrderResponseDto {
  id: number;
  products: ProductResponseDto[]; // je nach Bedarf: nur IDs oder volle Produkte
  totalPrice: number;
  customer: CustomerResponseDto;
}
