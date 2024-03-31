import { Module } from '@nestjs/common';
import { CustomTemplateController } from './custom-template.controller';
import { CustomTemplateService } from './custom-template.service';
import { AuthModule } from '@/api/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Homepage } from '@/migrations/homepage.entity';
import { Opening } from '@/migrations/opening.entity';
import { BrideGroom } from '@/migrations/bride_groom.entity';
import { VenueDate } from '@/migrations/venue_date.entity';
import { Gallery } from '@/migrations/gallery.entity';
import { LoveStory } from '@/migrations/love_story.entity';
import { LiveStreaming } from '@/migrations/live_streaming.entity';
import { Rsvp } from '@/migrations/rsvp.entity';
import { GiftCorner } from '@/migrations/gift_corner.entity';
import { Wishlist } from '@/migrations/wishlist.entity';
import { Closing } from '@/migrations/closing.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Homepage,
      Opening,
      BrideGroom,
      VenueDate,
      Gallery,
      LoveStory,
      LiveStreaming,
      Rsvp,
      GiftCorner,
      Wishlist,
      Closing
    ]),
    AuthModule
  ],
  controllers: [CustomTemplateController],
  providers: [CustomTemplateService]
})
export class CustomTemplateModule {}
