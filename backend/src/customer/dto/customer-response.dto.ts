export class CustomerResponseDto {
  id: number;
  name: string;
  email: string;
  // optional: Anzahl Bestellungen oder orders: OrderDto[] je nach Usecase
}
