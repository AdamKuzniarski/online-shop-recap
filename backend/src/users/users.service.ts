import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create({
      id: uuidv4(), // zufällige UUID statt inkrementeller ID
      ...createUserDto,
    });
    return this.userRepository.save(newUser);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    const update = { ...user, ...updateUserDto };
    return this.userRepository.save(update);
  }

  async delete(id: string): Promise<User> {
    const removedUser = await this.findOne(id);
    await this.userRepository.remove(removedUser);
    return removedUser;
  }
}
