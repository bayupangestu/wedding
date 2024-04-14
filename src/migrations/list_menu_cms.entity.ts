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
import { RoleMenu } from './role_menu.entity';

@Entity()
export class ListMenuCms extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar' })
  public name!: string;

  @Column({ type: 'text', nullable: true })
  public icon!: string;

  @Column({ type: 'varchar', nullable: true })
  public path!: string;

  @OneToMany(() => RoleMenu, (role_menu) => role_menu.list_menu_cms, {
    cascade: true
  })
  public role_menu!: RoleMenu[];

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
