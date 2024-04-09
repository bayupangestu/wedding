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
import { Font } from './font.entity';

@Entity()
export class Opening extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @ManyToOne(() => ElementTop, (element_top) => element_top.opening_left, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'element_top_id' })
  public element_top_left!: ElementTop;

  @ManyToOne(() => ElementTop, (element_top) => element_top.opening_right, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'element_top_id' })
  public element_top_right!: ElementTop;

  @ManyToOne(() => ElementBot, (element_bot) => element_bot.opening_right, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'element_bot_right_id' })
  public element_bot_right!: ElementBot;

  @ManyToOne(() => ElementBot, (element_bot) => element_bot.opening_left, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'element_bot_left_id' })
  public element_bot_left!: ElementBot;

  @ManyToOne(() => Background, (background) => background.opening, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'background_id' })
  public background!: Background;

  @ManyToOne(() => Frame, (frame) => frame.opening, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'frame_id' })
  public frame!: Frame;

  @ManyToOne(() => Animation, (animation) => animation.opening, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'animation_id' })
  public animation!: Animation;

  @ManyToOne(() => Color, (color) => color.opening, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'color_id' })
  public color!: Color;

  @OneToMany(() => Template, (template) => template.opening, {
    cascade: true
  })
  public template!: Template[];

  @ManyToOne(() => Font, (font) => font.opening, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'font_id' })
  public font!: Font;

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
