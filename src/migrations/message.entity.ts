import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  BaseEntity,
  OneToOne
} from 'typeorm';

import { User } from './user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE'
  })
  public user!: User;

  @Column({ type: 'varchar' })
  public sender_name!: string;

  @Column({ type: 'text' })
  public message!: string;

  @Column({ type: 'enum', enum: ['hadir', 'tidak hadir'] })
  public attendace!: string;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  public created_at!: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  public updated_at!: Date;

  @Exclude()
  @Column({ type: 'timestamp', nullable: true })
  public deleted_at: Date | null;
}
