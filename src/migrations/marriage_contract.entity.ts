import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn
} from 'typeorm';

import { User } from './user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class MarriageContract {
  @PrimaryGeneratedColumn()
  public id!: number;

  @OneToOne(() => User, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'user_id' })
  public user!: User;

  @Column({ type: 'varchar' })
  public venue!: string;

  @Column({ type: 'timestamp' })
  public date!: Date;

  @Column({ type: 'text' })
  public address!: string;

  @Column({ type: 'decimal', precision: 15, scale: 10, nullable: true })
  public long!: number;

  @Column({ type: 'decimal', precision: 15, scale: 10, nullable: true })
  public lat!: number;

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
