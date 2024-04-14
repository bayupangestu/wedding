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
import { UserPackageTemplate } from './user_package_template.entity';
import { PackageFeature } from './package_feature.entity';

@Entity()
export class Package extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar' })
  public name!: string;

  @Column({ type: 'int' })
  public price!: number;

  @Column({ type: 'text' })
  public description!: string;

  @OneToMany(
    () => UserPackageTemplate,
    (user_package_template) => user_package_template.packages,
    {
      cascade: true
    }
  )
  public user_package_template!: UserPackageTemplate[];

  @OneToMany(
    () => PackageFeature,
    (package_feature) => package_feature.package,
    {
      cascade: true
    }
  )
  public package_feature!: PackageFeature[];

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
