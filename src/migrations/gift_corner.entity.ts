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
export class GiftCorner extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @ManyToOne(() => ElementTop, (element_top) => element_top.gift_corner, {
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  public element_top!: ElementTop;

  @ManyToOne(() => ElementBot, (element_bot) => element_bot.gift_corner, {
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  public element_bot!: ElementBot;

  @ManyToOne(() => Background, (background) => background.gift_corner, {
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  public background!: Background;

  @ManyToOne(() => Frame, (frame) => frame.gift_corner, {
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  public frame!: Frame;

  @ManyToOne(() => Animation, (animation) => animation.gift_corner, {
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  public animation!: Animation;

  @ManyToOne(() => Color, (color) => color.gift_corner, {
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  public color!: Color;

  @OneToMany(() => Template, (template) => template.gift_corner, {
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
