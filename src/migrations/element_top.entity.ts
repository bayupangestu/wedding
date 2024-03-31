import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BaseEntity,
  OneToMany
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { Homepage } from './homepage.entity';
import { Opening } from './opening.entity';
import { BrideGroom } from './bride_groom.entity';
import { VenueDate } from './venue_date.entity';
import { Gallery } from './gallery.entity';
import { LoveStory } from './love_story.entity';
import { LiveStreaming } from './live_streaming.entity';
import { Rsvp } from './rsvp.entity';
import { GiftCorner } from './gift_corner.entity';
import { Wishlist } from './wishlist.entity';
import { Closing } from './closing.entity';

@Entity()
export class ElementTop extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar' })
  public name!: string;

  @Column({ type: 'text' })
  public asset!: string;

  @OneToMany(() => Homepage, (homepage) => homepage.element_top, {
    cascade: true
  })
  public homepage!: Homepage[];

  @OneToMany(() => Opening, (opening) => opening.element_top, {
    cascade: true
  })
  public opening!: Opening[];

  @OneToMany(() => BrideGroom, (bride_groom) => bride_groom.element_top, {
    cascade: true
  })
  public bride_groom!: BrideGroom[];

  @OneToMany(() => VenueDate, (venue_date) => venue_date.element_top, {
    cascade: true
  })
  public venue_date!: VenueDate[];

  @OneToMany(() => Gallery, (gallery) => gallery.element_top, {
    cascade: true
  })
  public gallery!: Gallery[];

  @OneToMany(() => LoveStory, (love_story) => love_story.element_top, {
    cascade: true
  })
  public love_story!: LoveStory[];

  @OneToMany(
    () => LiveStreaming,
    (live_streaming) => live_streaming.element_top,
    {
      cascade: true
    }
  )
  public live_streaming!: LiveStreaming[];

  @OneToMany(() => Rsvp, (rsvp) => rsvp.element_top, {
    cascade: true
  })
  public rsvp!: Rsvp[];

  @OneToMany(() => GiftCorner, (gift_corner) => gift_corner.element_top, {
    cascade: true
  })
  public gift_corner!: GiftCorner[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.element_top, {
    cascade: true
  })
  public wishlist!: Wishlist[];

  @OneToMany(() => Closing, (closing) => closing.element_top, {
    cascade: true
  })
  public closing!: Closing[];

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
