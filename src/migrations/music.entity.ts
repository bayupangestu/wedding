import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
  JoinColumn,
  OneToOne
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { User } from './user.entity';

@Entity()
export class Music extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @OneToOne(() => User, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'user_id' })
  public user!: User;

  @Column()
  public name!: string;

  @Exclude()
  @CreateDateColumn()
  public created_at!: Date;

  @Exclude()
  @UpdateDateColumn()
  public updated_at!: Date;

  @Exclude()
  @DeleteDateColumn({ nullable: true })
  public deleted_at!: Date | null;
}
