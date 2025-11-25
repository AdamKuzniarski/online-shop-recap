import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Customer } from '../customer/customer.entity';
import { Product } from '../products/products.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,

    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,

    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  findAll() {
    return this.orderRepo.find({
      relations: ['products', 'customer'],
    });
  }

  async findOne(id: number) {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['products', 'customer'],
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  // ------------------------------------------
  // CREATE ORDER (mit automatischer Preisberechnung)
  // ------------------------------------------
  async create(data: CreateOrderDto) {
    const { customerId, productIds } = data;

    const customer = await this.customerRepo.findOne({
      where: { id: customerId },
    });

    if (!customer) throw new NotFoundException('Customer not found');

    const products = await this.productRepo.find({
      where: { id: In(productIds) },
    });

    if (products.length !== productIds.length) {
      throw new NotFoundException('One or more products not found');
    }

    const totalPrice = products.reduce((sum, p) => sum + Number(p.price), 0);

    const order = this.orderRepo.create({
      customer,
      products,
      totalPrice,
    });

    return this.orderRepo.save(order);
  }

  // ------------------------------------------
  // UPDATE ORDER (optional: products neu setzen)
  // ------------------------------------------
  async update(id: number, data: UpdateOrderDto) {
    const order = await this.findOne(id);

    if (data.customerId) {
      const customer = await this.customerRepo.findOne({
        where: { id: data.customerId },
      });
      if (!customer) throw new NotFoundException('Customer not found');
      order.customer = customer;
    }

    if (data.productIds) {
      const products = await this.productRepo.find({
        where: { id: In(data.productIds) },
      });

      if (products.length !== data.productIds.length) {
        throw new NotFoundException('One or more products not found');
      }

      order.products = products;

      // totalPrice neu berechnen
      order.totalPrice = products.reduce((sum, p) => sum + Number(p.price), 0);
    }

    return this.orderRepo.save(order);
  }

  async remove(id: number) {
    const order = await this.findOne(id);
    return this.orderRepo.remove(order);
  }
}
