import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Product } from './products/products.entity';
import { ProductsModule } from './products/products.module';
import { CustomersModule } from './customer/customer.module';
import { OrdersModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Customer } from './customer/customer.entity';
import { Order } from './order/order.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.POSTGRES_URL,
      autoLoadEntities: true,
      entities: [Product, User, Customer, Order],
      synchronize: true, // Nur während Entwicklung!
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
    ProductsModule,
    CustomersModule,
    OrdersModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    AppService,
  ],
})
export class AppModule {}
