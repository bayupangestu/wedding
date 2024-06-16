import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToOne
} from 'typeorm';
import { UserBank } from './user_bank.entity';

@Entity()
export class Bank extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @OneToMany(() => UserBank, (user_bank) => user_bank.bank, {
    cascade: true
  })
  public user_bank!: UserBank[];

  @Column({ type: 'varchar' })
  public name!: string;

  @Column({ type: 'varchar' })
  public asset!: string;

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
