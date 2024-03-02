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
import { ElementTop } from './element_top.entity';
import { ElementBot } from './element_bot.entity';
import { Background } from './background.entity';
import { Frame } from './frame.entity';
import { Animation } from './animation.entity';
import { Color } from './color.entity';
import { Template } from './template.entity';

@Entity()
export class BrideGroom extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @ManyToOne(() => ElementTop, (element_top) => element_top.bride_groom, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'element_top_id' })
  public element_top!: ElementTop;

  @ManyToOne(() => ElementBot, (element_bot) => element_bot.bride_groom, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'element_bot_id' })
  public element_bot!: ElementBot;

  @ManyToOne(() => Background, (background) => background.bride_groom, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'background_id' })
  public background!: Background;

  @ManyToOne(() => Frame, (frame) => frame.bride_groom, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'frame_id' })
  public frame!: Frame;

  @ManyToOne(() => Animation, (animation) => animation.bride_groom, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'animation_id' })
  public animation!: Animation;

  @ManyToOne(() => Color, (color) => color.bride_groom, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'color_id' })
  public color!: Color;

  @OneToMany(() => Template, (template) => template.bride_groom, {
    cascade: true
  })
  public template!: Template[];

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
