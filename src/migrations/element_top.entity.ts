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
  public element_top_name!: string;

  @Column({ type: 'text' })
  public element_top_asset!: string;

  @Column({ type: 'varchar' })
  public element_top_type!: string;

  @OneToMany(() => Homepage, (homepage) => homepage.element_top_right, {
    cascade: true
  })
  public homepage_right!: Homepage[];

  @OneToMany(() => Homepage, (homepage) => homepage.element_top_left, {
    cascade: true
  })
  public homepage_left!: Homepage[];

  @OneToMany(() => Opening, (opening) => opening.element_top_left, {
    cascade: true
  })
  public opening_left!: Opening[];

  @OneToMany(() => Opening, (opening) => opening.element_top_right, {
    cascade: true
  })
  public opening_right!: Opening[];

  @OneToMany(() => BrideGroom, (bride_groom) => bride_groom.element_top_left, {
    cascade: true
  })
  public bride_groom_left!: BrideGroom[];

  @OneToMany(() => BrideGroom, (bride_groom) => bride_groom.element_top_right, {
    cascade: true
  })
  public bride_groom_right!: BrideGroom[];

  @OneToMany(() => VenueDate, (venue_date) => venue_date.element_top_left, {
    cascade: true
  })
  public venue_date_left!: VenueDate[];

  @OneToMany(() => VenueDate, (venue_date) => venue_date.element_top_right, {
    cascade: true
  })
  public venue_date_right!: VenueDate[];

  @OneToMany(() => Gallery, (gallery) => gallery.element_top_left, {
    cascade: true
  })
  public gallery_left!: Gallery[];

  @OneToMany(() => Gallery, (gallery) => gallery.element_top_right, {
    cascade: true
  })
  public gallery_right!: Gallery[];

  @OneToMany(() => LoveStory, (love_story) => love_story.element_top_left, {
    cascade: true
  })
  public love_story_left!: LoveStory[];

  @OneToMany(() => LoveStory, (love_story) => love_story.element_top_right, {
    cascade: true
  })
  public love_story_right!: LoveStory[];

  @OneToMany(
    () => LiveStreaming,
    (live_streaming) => live_streaming.element_top_right,
    {
      cascade: true
    }
  )
  public live_streaming_right!: LiveStreaming[];

  @OneToMany(
    () => LiveStreaming,
    (live_streaming) => live_streaming.element_top_left,
    {
      cascade: true
    }
  )
  public live_streaming_left!: LiveStreaming[];

  @OneToMany(() => Rsvp, (rsvp) => rsvp.element_top_left, {
    cascade: true
  })
  public rsvp_left!: Rsvp[];

  @OneToMany(() => Rsvp, (rsvp) => rsvp.element_top_right, {
    cascade: true
  })
  public rsvp_right!: Rsvp[];

  @OneToMany(() => GiftCorner, (gift_corner) => gift_corner.element_top_left, {
    cascade: true
  })
  public gift_corner_left!: GiftCorner[];

  @OneToMany(() => GiftCorner, (gift_corner) => gift_corner.element_top_right, {
    cascade: true
  })
  public gift_corner_right!: GiftCorner[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.element_top_right, {
    cascade: true
  })
  public wishlist_right!: Wishlist[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.element_top_left, {
    cascade: true
  })
  public wishlist_left!: Wishlist[];

  @OneToMany(() => Closing, (closing) => closing.element_top_left, {
    cascade: true
  })
  public closing_left!: Closing[];

  @OneToMany(() => Closing, (closing) => closing.element_top_right, {
    cascade: true
  })
  public closing_right!: Closing[];

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
