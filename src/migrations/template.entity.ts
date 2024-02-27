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
import { UserPackageTemplate } from './user_package_template.entity';

// id
// template_name
// homepage_id	fk
// opening_id	fk
// bride_groom_id	fk
// venue_date_id	fk
// gallery_id	fk
// love_story_id	fk
// live_streaming_id	fk
// rsvp_id	fk
// gift_corner_id	fk
// wishlist_id	fk
// closing_id	fk
// created_at
// updated_at
// deleted_at

@Entity()
export class Template extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar' })
  public template_name!: string;

  @ManyToOne(() => Homepage, (homepage) => homepage.template, {
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  public homepage!: Homepage;

  @ManyToOne(() => Opening, (opening) => opening.template, {
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  public opening!: Opening;

  @ManyToOne(() => BrideGroom, (bride_groom) => bride_groom.template, {
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  public bride_groom!: BrideGroom;

  @ManyToOne(() => VenueDate, (venue_date) => venue_date.template, {
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  public venue_date!: VenueDate;

  @ManyToOne(() => Gallery, (gallery) => gallery.template, {
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  public gallery!: Gallery;

  @ManyToOne(() => LoveStory, (love_story) => love_story.template, {
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  public love_story!: LoveStory;

  @ManyToOne(() => LiveStreaming, (live_streaming) => live_streaming.template, {
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  public live_streaming!: LiveStreaming;

  @ManyToOne(() => Rsvp, (rsvp) => rsvp.template, {
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  public rsvp!: Rsvp;

  @ManyToOne(() => GiftCorner, (gift_corner) => gift_corner.template, {
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  public gift_corner!: GiftCorner;

  @ManyToOne(() => Wishlist, (wishlist) => wishlist.template, {
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  public wishlist!: Wishlist;

  @ManyToOne(() => Closing, (closing) => closing.template, {
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  public closing!: Closing;

  @OneToMany(
    () => UserPackageTemplate,
    (user_package_template) => user_package_template.template,
    {
      cascade: true
    }
  )
  public user_package_template!: UserPackageTemplate[];

  @Exclude()
  @CreateDateColumn()
  public created_at!: Date;

  @Exclude()
  @UpdateDateColumn()
  public updated_at!: Date;

  @Exclude()
  @DeleteDateColumn({ nullable: true })
  public deleted_at!: Date | null;
}
