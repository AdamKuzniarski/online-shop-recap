import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { Products } from './products.entity';
import { ProductsController } from './products.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Products])], // Makes the Products Repository available
  providers: [ProductsService],
  exports: [ProductsService],
  controllers: [ProductsController], // Export if other modules (in this case OrderModule) need to use ProductsService
})
export class ProductsModule {}
