import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Products } from './products/products.entity';
import { ProductsModule } from './products/products.module';
import { CustomerModule } from './customer/customer.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.POSTGRES_URL,
      autoLoadEntities: true,
      entities: [Products],
      synchronize: true, // Nur während Entwicklung!
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
    ProductsModule,
    CustomerModule,
    OrderModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
