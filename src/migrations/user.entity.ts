import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany
} from 'typeorm';
import { BrideInfo } from './bride_info.entity';
import { UserPackageTemplate } from './user_package_template.entity';

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

  @Column({
    type: 'enum',
    enum: ['superadmin', 'admin', 'user'],
    default: 'user'
  })
  public role!: 'superadmin' | 'admin' | 'user';

  @OneToMany(
    () => UserPackageTemplate,
    (user_package_template) => user_package_template.user,
    {
      cascade: true
    }
  )
  public user_package_template!: UserPackageTemplate[];

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  public deletedAt: Date | null;
}
