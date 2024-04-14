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

// id
// user_id	fk
// full_name
// social_media	json
// groom_address
// groom_parents	json
// created_at
// updated_at
// deleted_at

import { User } from './user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class GroomInfo extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @OneToOne(() => User, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'user_id' })
  public user!: User;

  @Column({ type: 'varchar' })
  public full_name!: string;

  @Column({ type: 'json', nullable: true })
  public social_media!: { instagram: string; tiktok: string };

  @Column({ type: 'varchar' })
  public groom_address!: string;

  @Column({ type: 'json' })
  public groom_parents!: { father: string; mother: string };

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
