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
import { Homepage } from './homepage.entity';
import { Exclude } from 'class-transformer';
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
export class Animation extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'text' })
  public animation_name!: string;

  @OneToMany(() => Homepage, (homepage) => homepage.animation, {
    cascade: true
  })
  public homepage!: Homepage[];

  @OneToMany(() => Opening, (opening) => opening.animation, {
    cascade: true
  })
  public opening!: Opening[];

  @OneToMany(() => BrideGroom, (bride_groom) => bride_groom.animation, {
    cascade: true
  })
  public bride_groom!: BrideGroom[];

  @OneToMany(() => VenueDate, (venue_date) => venue_date.animation, {
    cascade: true
  })
  public venue_date!: VenueDate[];

  @OneToMany(() => Gallery, (gallery) => gallery.animation, {
    cascade: true
  })
  public gallery!: Gallery[];

  @OneToMany(() => LoveStory, (love_story) => love_story.animation, {
    cascade: true
  })
  public love_story!: LoveStory[];

  @OneToMany(
    () => LiveStreaming,
    (live_streaming) => live_streaming.animation,
    {
      cascade: true
    }
  )
  public live_streaming!: LiveStreaming[];

  @OneToMany(() => Rsvp, (rsvp) => rsvp.animation, {
    cascade: true
  })
  public rsvp!: Rsvp[];

  @OneToMany(() => GiftCorner, (gift_corner) => gift_corner.animation, {
    cascade: true
  })
  public gift_corner!: GiftCorner[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.animation, {
    cascade: true
  })
  public wishlist!: Wishlist[];

  @OneToMany(() => Closing, (closing) => closing.animation, {
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
