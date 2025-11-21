import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from './products.entity';

@Injectable()
export class ProductsService {
  constructor(
    // Inject TypeORM's Repository for the products entity
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
  ) {}

  async findAll(): Promise<Products[]> {
    return this.productsRepository.find();
  }

  async findOne(id: number): Promise<Products | null> {
    return this.productsRepository.findOne({ where: { id } });
  }

  async create(products: Partial<Products>): Promise<Products> {
    const newproducts = this.productsRepository.create(products); // Creates a new entity instance (not yet saved to DB)
    return this.productsRepository.save(newproducts); // Saves the instance to the database
  }

  async update(
    id: number,
    products: Partial<Products>,
  ): Promise<Products | null> {
    await this.productsRepository.update(id, products); // Updates by ID directly
    return this.productsRepository.findOne({ where: { id } }); // Returns the updated products
  }

  async remove(id: number): Promise<void> {
    await this.productsRepository.delete(id); // Deletes by ID
  }
}
