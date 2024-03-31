import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
import { Repository } from 'typeorm';
import { CustomTemplateDto } from './custom-template.dto';

@Injectable()
export class CustomTemplateService {
  @InjectRepository(Homepage)
  private readonly homepageRepository: Repository<Homepage>;

  @InjectRepository(Opening)
  private readonly openingRepository: Repository<Opening>;

  @InjectRepository(BrideGroom)
  private readonly brideGroomRepository: Repository<BrideGroom>;

  @InjectRepository(VenueDate)
  private readonly venueDateRepository: Repository<VenueDate>;

  @InjectRepository(Gallery)
  private readonly galleryRepository: Repository<Gallery>;

  @InjectRepository(LoveStory)
  private readonly loveStoryRepository: Repository<LoveStory>;

  @InjectRepository(LiveStreaming)
  private readonly liveStreamingRepository: Repository<LiveStreaming>;

  @InjectRepository(Rsvp)
  private readonly rsvpRepository: Repository<Rsvp>;

  @InjectRepository(GiftCorner)
  private readonly giftCornerRepository: Repository<GiftCorner>;

  @InjectRepository(Wishlist)
  private readonly wishlistRepository: Repository<Wishlist>;

  @InjectRepository(Closing)
  private readonly closingRepository: Repository<Closing>;

  private async createHomepage(body: any): Promise<any> {
    const homepage = new Homepage();
    homepage.element_bot = body.element_bot;
    homepage.element_top = body.element_top;
    homepage.background = body.background;
    homepage.frame = body.frame;
    homepage.animation = body.animation;
    homepage.color = body.color;

    await this.homepageRepository.save(homepage);
    return {
      statusCode: 201,
      message: 'Homepage created successfully'
    };
  }

  private async createOpening(body: any): Promise<any> {
    const opening = new Opening();
    opening.element_bot = body.element_bot;
    opening.element_top = body.element_top;
    opening.background = body.background;
    opening.frame = body.frame;
    opening.animation = body.animation;
    opening.color = body.color;

    await this.openingRepository.save(opening);
    return {
      statusCode: 201,
      message: 'Opening created successfully'
    };
  }

  private async createBrideGroom(body: any): Promise<any> {
    const brideGroom = new BrideGroom();
    brideGroom.element_bot = body.element_bot;
    brideGroom.element_top = body.element_top;
    brideGroom.background = body.background;
    brideGroom.frame = body.frame;
    brideGroom.animation = body.animation;
    brideGroom.color = body.color;

    await this.brideGroomRepository.save(brideGroom);
    return {
      statusCode: 201,
      message: 'BrideGroom created successfully'
    };
  }

  private async createVenueDate(body: any): Promise<any> {
    const venueDate = new VenueDate();
    venueDate.element_bot = body.element_bot;
    venueDate.element_top = body.element_top;
    venueDate.background = body.background;
    venueDate.frame = body.frame;
    venueDate.animation = body.animation;
    venueDate.color = body.color;

    await this.venueDateRepository.save(venueDate);
    return {
      statusCode: 201,
      message: 'VenueDate created successfully'
    };
  }

  private async createGallery(body: any): Promise<any> {
    const gallery = new Gallery();
    gallery.element_bot = body.element_bot;
    gallery.element_top = body.element_top;
    gallery.background = body.background;
    gallery.frame = body.frame;
    gallery.animation = body.animation;
    gallery.color = body.color;

    await this.galleryRepository.save(gallery);
    return {
      statusCode: 201,
      message: 'Gallery created successfully'
    };
  }

  private async createLoveStory(body: any): Promise<any> {
    const loveStory = new LoveStory();
    loveStory.element_bot = body.element_bot;
    loveStory.element_top = body.element_top;
    loveStory.background = body.background;
    loveStory.frame = body.frame;
    loveStory.animation = body.animation;
    loveStory.color = body.color;

    await this.loveStoryRepository.save(loveStory);
    return {
      statusCode: 201,
      message: 'LoveStory created successfully'
    };
  }

  private async createLiveStreaming(body: any): Promise<any> {
    const liveStreaming = new LiveStreaming();
    liveStreaming.element_bot = body.element_bot;
    liveStreaming.element_top = body.element_top;
    liveStreaming.background = body.background;
    liveStreaming.frame = body.frame;
    liveStreaming.animation = body.animation;
    liveStreaming.color = body.color;

    await this.liveStreamingRepository.save(liveStreaming);
    return {
      statusCode: 201,
      message: 'LiveStreaming created successfully'
    };
  }

  private async createRsvp(body: any): Promise<any> {
    const rsvp = new Rsvp();
    rsvp.element_bot = body.element_bot;
    rsvp.element_top = body.element_top;
    rsvp.background = body.background;
    rsvp.frame = body.frame;
    rsvp.animation = body.animation;
    rsvp.color = body.color;

    await this.rsvpRepository.save(rsvp);
    return {
      statusCode: 201,
      message: 'Rsvp created successfully'
    };
  }

  private async createGiftCorner(body: any): Promise<any> {
    const giftCorner = new GiftCorner();
    giftCorner.element_bot = body.element_bot;
    giftCorner.element_top = body.element_top;
    giftCorner.background = body.background;
    giftCorner.frame = body.frame;
    giftCorner.animation = body.animation;
    giftCorner.color = body.color;

    await this.giftCornerRepository.save(giftCorner);
    return {
      statusCode: 201,
      message: 'GiftCorner created successfully'
    };
  }

  private async createWishlist(body: any): Promise<any> {
    const wishlist = new Wishlist();
    wishlist.element_bot = body.element_bot;
    wishlist.element_top = body.element_top;
    wishlist.background = body.background;
    wishlist.frame = body.frame;
    wishlist.animation = body.animation;
    wishlist.color = body.color;

    await this.wishlistRepository.save(wishlist);
    return {
      statusCode: 201,
      message: 'Wishlist created successfully'
    };
  }

  private async createClosing(body: any): Promise<any> {
    const closing = new Closing();
    closing.element_bot = body.element_bot;
    closing.element_top = body.element_top;
    closing.background = body.background;
    closing.frame = body.frame;
    closing.animation = body.animation;
    closing.color = body.color;

    await this.closingRepository.save(closing);
    return {
      statusCode: 201,
      message: 'Closing created successfully'
    };
  }
}
