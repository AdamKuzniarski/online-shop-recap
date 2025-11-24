import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(customerData: Partial<Customer>): Promise<Customer> {
    const customer = this.customerRepository.create(customerData);
    return await this.customerRepository.save(customer);
  }

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  async findOne(id: string): Promise<Customer> {
    const customer = await this.customerRepository.findOne({ where: { id } });
    if (!customer) throw new NotFoundException('Customer not found');
    return customer;
  }

  async update(id: string, data: Partial<Customer>): Promise<Customer> {
    await this.customerRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.customerRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException('Customer not found');
  }

  async addOrder(id: string, orderId: string): Promise<Customer> {
    const customer = await this.findOne(id);
    customer.orderIds.push(orderId);
    return await this.customerRepository.save(customer);
  }
}
