import { Exclude } from 'class-transformer';
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
import { PackageFeature } from './package_feature.entity';

@Entity()
export class Feature extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar' })
  public name!: string;

  @OneToMany(
    () => PackageFeature,
    (package_feature) => package_feature.feature,
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
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  public deleted_at!: Date | null;
}
