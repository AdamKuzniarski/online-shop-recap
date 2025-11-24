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
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.POSTGRES_URL,
      autoLoadEntities: true,
      entities: [Products, User],
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
