import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BaseEntity,
  OneToMany
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class CustomPageOrder extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'json' })
  public order_page!: Array<any>;

  @Exclude()
  @CreateDateColumn()
  public created_at!: Date;

  @Exclude()
  @UpdateDateColumn()
  public updated_at!: Date;

  @Exclude()
  @DeleteDateColumn()
  public deleted_at!: Date;
}
