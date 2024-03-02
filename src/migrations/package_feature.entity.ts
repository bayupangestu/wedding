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
import { Package } from './package.entity';
import { Feature } from './feature.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class PackageFeature extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @ManyToOne(() => Package, (packages) => packages.package_feature, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'package_id' })
  public package!: any;

  @ManyToOne(() => Feature, (features) => features.package_feature, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'feature_id' })
  public feature!: Feature;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  public created_at!: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  public updated_at!: Date;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  public deleted_at!: Date | null;
}
