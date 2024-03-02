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
  JoinColumn
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { User } from './user.entity';
import { Package } from './package.entity';
import { Template } from './template.entity';

// id;
// user_id;
// service_id;
// template_id;
// created_at;
// updated_at;
// deleted_at;

@Entity()
export class UserPackageTemplate extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @ManyToOne(() => User, (user) => user.user_package_template, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'user_id' })
  public user!: User;

  @ManyToOne(() => Package, (packages) => packages.user_package_template, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'package_id' })
  public packages!: Package;

  @ManyToOne(() => Template, (template) => template.user_package_template, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'template_id' })
  public template!: Template;

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
