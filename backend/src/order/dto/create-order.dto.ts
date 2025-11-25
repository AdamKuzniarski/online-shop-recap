import { IsArray, ArrayNotEmpty, IsInt, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Type(() => Number)
  productIds: number[];

  @Type(() => Number)
  @IsNumber({}, { message: 'totalPrice must be a number' })
  @Min(0)
  totalPrice: number;

  @IsInt()
  @Type(() => Number)
  customerId: number;
}
