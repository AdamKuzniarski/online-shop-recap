import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() // This decorator tells TypeORM that this class is a database entity (table)
export class Products {
  @PrimaryGeneratedColumn() // Marks 'id' as the primary key, and it auto-increments
  id: number;

  @Column({ length: 100, nullable: false })
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: false })
  price: number;
}
