import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
  ) {}

  findAll() {
    return this.customerRepo.find();
  }

  async findOne(id: number) {
    const customer = await this.customerRepo.findOne({
      where: { id },
      relations: ['orders'],
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return customer;
  }

  create(data: CreateCustomerDto) {
    const customer = this.customerRepo.create(data);
    return this.customerRepo.save(customer);
  }

  async update(id: number, data: UpdateCustomerDto) {
    const customer = await this.findOne(id);

    Object.assign(customer, data);
    return this.customerRepo.save(customer);
  }

  async remove(id: number) {
    const customer = await this.findOne(id);
    return this.customerRepo.remove(customer);
  }
}
