import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersController } from './customer.controller';
import { CustomerService } from './customer.service';
import { Customer } from './customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [CustomersController],
  providers: [CustomerService],
  exports: [CustomerService], // wichtig für OrdersModule
})
export class CustomersModule {}
