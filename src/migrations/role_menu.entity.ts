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
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Role } from './role.entity';
import { ListMenuCms } from './list_menu_cms.entity';

@Entity()
export class RoleMenu extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @ManyToOne(() => Role, (role) => role.role_menu, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'role_id' })
  public role!: any;

  @ManyToOne(() => ListMenuCms, (list_menu_cms) => list_menu_cms.role_menu, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'list_menu_cms_id' })
  public list_menu_cms!: any;

  @CreateDateColumn({ type: 'timestamp' })
  public created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updated_at!: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  public deleted_at: Date | null;
}
