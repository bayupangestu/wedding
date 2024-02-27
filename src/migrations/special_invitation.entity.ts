import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
  BaseEntity
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from './user.entity';

@Entity()
export class SpecialInvitation extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @OneToOne(() => User, {
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  public user!: User;

  @Column({ type: 'varchar' })
  public name!: string;

  @Column({ type: 'varchar' })
  public slug!: string;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  public created_at!: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  public updated_at!: Date;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamp' })
  public deleted_at!: Date;
}
