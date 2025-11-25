import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrdersController } from './order.controller';
import { OrdersService } from './order.service';
import { CustomersModule } from '../customer/customer.module';
import { ProductsModule } from '../products/products.module';
import { Customer } from '../customer/customer.entity';
import { Product } from '../products/products.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Customer, Product]),
    CustomersModule,
    ProductsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
