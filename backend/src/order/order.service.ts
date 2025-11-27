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

  // =====================================================
  // ========== GET ALL ORDERS WITH TOTAL PRICE ==========
  // =====================================================
async findAll() {
  const orders = await this.orderRepo
    .createQueryBuilder('order')
    .leftJoinAndSelect('order.products', 'product')
    .leftJoinAndSelect('order.customer', 'customer')
    .addSelect(subQuery => {
      return subQuery
        .select('SUM(p.price)', 'totalPrice')
        .from('order_products', 'op')
        .innerJoin('product', 'p', 'p.id = op.product_id')
        .where('op.order_id = "order".id');
    }, 'totalPrice')
    .getRawAndEntities();

  return orders.entities.map((entity, i) => ({
    ...entity,
    totalPrice: Number(orders.raw[i].totalPrice),
  }));
}

  // =====================================================
  // ========== GET ONE ORDER WITH TOTAL PRICE ===========
  // =====================================================
async findOne(id: number) {
  const result = await this.orderRepo
    .createQueryBuilder('order')
    .leftJoinAndSelect('order.products', 'product')
    .leftJoinAndSelect('order.customer', 'customer')
    .addSelect(subQuery => {
      return subQuery
        .select('SUM(p.price)', 'totalPrice')
        .from('order_products', 'op')
        .innerJoin('product', 'p', 'p.id = op.product_id')
        .where('op.order_id = "order".id');
    }, 'totalPrice')
    .where('order.id = :id', { id })
    .getRawAndEntities();

  if (!result.entities.length) {
    throw new NotFoundException('Order not found');
  }

  return {
    ...result.entities[0],
    totalPrice: Number(result.raw[0].totalPrice),
  };
}

  // =====================================================
  // ===================== CREATE ========================
  // =====================================================
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

    const order = this.orderRepo.create({
      customer,
      products,
    });

    return this.orderRepo.save(order);
  }

  // =====================================================
  // ===================== UPDATE ========================
  // =====================================================
  async update(id: number, data: UpdateOrderDto) {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['products', 'customer'],
    });

    if (!order) throw new NotFoundException('Order not found');

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
    }

    return this.orderRepo.save(order);
  }

  // =====================================================
  // ===================== DELETE ========================
  // =====================================================
  async remove(id: number) {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (!order) throw new NotFoundException('Order not found');

    return this.orderRepo.remove(order);
  }
}
