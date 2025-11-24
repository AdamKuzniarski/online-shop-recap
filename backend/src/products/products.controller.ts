import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Products } from './products.entity';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // GET /products
  @Public()
  @Get()
  async findAll(): Promise<Products[]> {
    return this.productsService.findAll();
  }

  // GET /products/:id
  @Public()
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Products | null> {
    return this.productsService.findOne(id);
  }

  // POST /products
  @Post()
  async create(@Body() data: Partial<Products>): Promise<Products> {
    return this.productsService.create(data);
  }

  // PUT /products/:id
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Products>,
  ): Promise<Products | null> {
    return this.productsService.update(id, data);
  }

  // DELETE /products/:id
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.productsService.remove(id);
  }
}
