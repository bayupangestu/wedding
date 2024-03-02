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
import { UserPackageTemplate } from './user_package_template.entity';
import { Role } from './role.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar' })
  public email!: string;

  @Exclude()
  @Column({ type: 'varchar' })
  public password!: string;

  @Column({ type: 'varchar', nullable: true })
  public name: string | null;

  @Column({ type: 'timestamp', nullable: true, default: null })
  public lastLoginAt: Date | null;

  @Column({ type: 'varchar', nullable: true })
  public slug: string | null;

  @Column({ type: 'varchar', nullable: true })
  public phone_number: string | null;

  @OneToMany(
    () => UserPackageTemplate,
    (user_package_template) => user_package_template.user,
    {
      cascade: true
    }
  )
  public user_package_template!: UserPackageTemplate[];

  @ManyToOne(() => Role, (role) => role.user, {
    onDelete: 'SET NULL'
  })
  @JoinColumn({ name: 'role_id' })
  public role!: Role;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  public deletedAt: Date | null;
}
