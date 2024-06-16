import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  BaseEntity,
  OneToOne,
  DeleteDateColumn
} from 'typeorm';

import { User } from './user.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'love_story_content' })
export class LoveStoryContent extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @OneToOne(() => User, {
    onDelete: 'CASCADE'
  })
  public user!: User;

  @Column({ type: 'text', nullable: true })
  public first_meet!: string;

  @Column({ type: 'text', nullable: true })
  public relationship!: string;

  @Column({ type: 'text', nullable: true })
  public engagement!: string;

  @Column({ type: 'text', nullable: true })
  public married!: string;

  @Column({ type: 'text', nullable: true })
  public quotes!: string;

  @Column({ type: 'date', nullable: true })
  public first_meet_date!: Date;

  @Column({ type: 'date', nullable: true })
  public relationship_date!: Date;

  @Column({ type: 'date', nullable: true })
  public engagement_date!: Date;

  @Column({ type: 'date', nullable: true })
  public married_date!: Date;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  public created_at!: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  public updated_at!: Date;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  public deleted_at: Date | null;
}
