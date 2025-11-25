import { IsString, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'price must be a number' })
  @Min(0)
  price: number;
}
