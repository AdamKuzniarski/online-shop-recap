import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from './customer.entity';
import { Public } from '../common/decorators/public.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}
  @Public()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: Partial<Customer>): Promise<Customer> {
    return this.customerService.create(data);
  }
  @Public()
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Customer[]> {
    return this.customerService.findAll();
  }
  @Public()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Customer> {
    return this.customerService.findOne(id);
  }
  @Public()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Customer>,
  ): Promise<Customer> {
    return this.customerService.update(id, data);
  }
  @Public()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.customerService.remove(id);
  }
  @Public()
  @UseGuards(JwtAuthGuard)
  @Post(':id/orders/:orderId')
  async addOrder(
    @Param('id') id: string,
    @Param('orderId') orderId: string,
  ): Promise<Customer> {
    return this.customerService.addOrder(id, orderId);
  }
}
