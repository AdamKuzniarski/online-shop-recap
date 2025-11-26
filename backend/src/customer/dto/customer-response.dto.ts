import {OrderResponseDto} from "../../order/dto/order-response.dto"
export class CustomerResponseDto {
  id: number;
  name: string;
  email: string;
  orders: OrderResponseDto[]
}
