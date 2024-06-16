import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  BaseEntity,
  OneToOne,
  DeleteDateColumn
} from 'typeorm';

import { User } from './user.entity';
import { Exclude } from 'class-transformer';

// description;
// type;
// created_at;
// updated_at;
// deleted_at;

@Entity()
export class Prayer extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @OneToOne(() => User, {
    onDelete: 'CASCADE'
  })
  public user!: User;

  @Column({ type: 'text' })
  public description!: string;

  @Column({ type: 'varchar' })
  public type!: string;

  @CreateDateColumn({ type: 'timestamp' })
  public created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updated_at!: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  public deleted_at: Date | null;
}
