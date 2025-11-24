import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum UserRole {
  MEMBER = 'member',
  ADMIN = 'admin',
}

@Entity() // This decorator tells TypeORM that this class is a database entity (table)
export class Customer {
  @PrimaryGeneratedColumn('uuid') // Marks 'id' as the primary key, and it auto-increments
  id: string;

  @Column({ nullable: false }) // 'firstName' column, string, max 100 chars, not null
  name: string;

  @Column({ nullable: false }) // 'lastName' column, can be null
  email: string; // `?` in TypeScript means the property is optional

  @Column('uuid', { array: true, default: [] })
  orderIds: string[]; // Array von Order UUIDs
}
