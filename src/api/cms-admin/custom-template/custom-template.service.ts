import { HttpException, Injectable } from '@nestjs/common';
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
import { ILike, Repository } from 'typeorm';
import { CustomTemplateDto } from './custom-template.dto';
import { Template } from '@/migrations/template.entity';
import { UserPackageTemplate } from '@/migrations/user_package_template.entity';
import { time } from 'console';

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

  @InjectRepository(Template)
  private readonly templateRepository: Repository<Template>;

  public async createTemplate(body: any, user_id: any): Promise<any> {
    const queryRunner =
      this.templateRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const template = new Template();
      template.template_name = body.name;
      template.homepage = await this.createHomepage(body.homepage);
      template.opening = await this.createOpening(body.opening);
      template.bride_groom = await this.createBrideGroom(body.bride_groom);
      template.venue_date = await this.createVenueDate(body.venue_date);
      template.gallery = await this.createGallery(body.gallery);
      template.love_story = await this.createLoveStory(body.love_story);
      template.live_streaming = await this.createLiveStreaming(
        body.live_streaming
      );
      template.rsvp = await this.createRsvp(body.rsvp);
      template.gift_corner = await this.createGiftCorner(body.gift_corner);
      template.wishlist = await this.createWishlist(body.wishlist);
      template.closing = await this.createClosing(body.closing);

      const resultTemplate = await queryRunner.manager.save(template);
      await queryRunner.manager.save(UserPackageTemplate, {
        user: user_id,
        template: resultTemplate
      });
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return {
        statusCode: 201,
        message: 'Template created successfully'
      };
    } catch (error) {
      console.log(error, '<<<<<');
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      return error;
    }
  }

  public async findAllTemplates(query: any): Promise<any> {
    const joinTable = await this.joinTable();
    if (query.type === 'form') {
      const result = await this.templateRepository.find({
        relations: joinTable
      });
      return {
        statusCode: 200,
        result
      };
    } else {
      query.page = query.page || 1;
      query.pageSize = query.pageSize || 10;

      const skip = (query.page - 1) * query.pageSize;
      const option: any = {
        skip: skip,
        take: query.pageSize,
        order: {
          created_at: 'DESC'
        },
        relations: joinTable
      };
      if (query.search) {
        option.where = {
          template_name: ILike(`%${query.search}%`)
        };
      }
      const [result, total] = await this.templateRepository.findAndCount(
        option
      );
      const totalPage = Math.ceil(total / query.pageSize);
      return {
        statusCode: 200,
        total,
        totalPage,
        page: query.page,
        pageSize: query.pageSize,
        result
      };
    }
  }

  public async findOneTemplate(id: number): Promise<any> {
    const joinTable = await this.joinTable();
    const result = await this.templateRepository.findOne({
      where: { id },
      // relations: {
      //   homepage: true,
      //   opening: true,
      //   bride_groom: true,
      //   venue_date: true,
      //   gallery: true,
      //   love_story: true,
      //   live_streaming: true,
      //   rsvp: true,
      //   gift_corner: true,
      //   wishlist: true,
      //   closing: true,
      //   user_package_template: true,
      //   custom_page_order: true
      // }
      relations: joinTable
    });
    if (!result) {
      throw new HttpException('Template Not found', 404);
    }
    if (!result.custom_page_order) {
      return {
        statusCode: 200,
        result
      };
    } else {
      // Sort data based on the order_array
      const sortedData = {};
      result.custom_page_order.order_page.forEach((key) => {
        sortedData[key] = result[key];
      });

      // Add remaining keys not in order_array
      Object.keys(result).forEach((key) => {
        if (
          !result.custom_page_order.order_page.includes(key) &&
          key !== 'custom_page_order'
        ) {
          sortedData[key] = result[key];
        }
      });
      return {
        statusCode: 200,
        result: sortedData
      };
    }
  }

  public async updateTemplate(id: number, body: any): Promise<any> {
    const queryRunner =
      this.templateRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const template = await this.templateRepository.findOne({
        where: { id }
      });
      if (!template) {
        throw new HttpException('Template not found', 404);
      }
      template.template_name = body.name ? body.name : template.template_name;
      template.homepage = await this.updateHomepage(id, body.homepage);
      template.opening = await this.updateOpening(id, body.opening);
      template.bride_groom = await this.updateBrideGroom(id, body.bride_groom);
      template.venue_date = await this.updateVenueDate(id, body.venue_date);
      template.gallery = await this.updateGallery(id, body.gallery);
      template.love_story = await this.updateLoveStory(id, body.love_story);
      template.live_streaming = await this.updateLiveStreaming(
        id,
        body.live_streaming
      );
      template.rsvp = await this.updateRsvp(id, body.rsvp);
      template.gift_corner = await this.updateGiftCorner(id, body.gift_corner);
      template.wishlist = await this.updateWishlist(id, body.wishlist);
      template.closing = await this.updateClosing(id, body.closing);

      await queryRunner.manager.update(Template, id, template);
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return {
        statusCode: 200,
        message: 'Template updated successfully'
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      return error;
    }
  }

  public async deleteTemplate(id: number): Promise<any> {
    const template = await this.templateRepository.findOne({
      where: { id }
    });
    if (!template) {
      throw new HttpException('Template not found', 404);
    }
    await this.templateRepository.softDelete(id);
    return {
      statusCode: 200,
      message: 'Template deleted successfully'
    };
  }

  private async createHomepage(body: any): Promise<any> {
    const homepage = new Homepage();
    homepage.element_bot_right = body.element_bot_right;
    homepage.element_bot_left = body.element_bot_left;
    homepage.element_top_right = body.element_top_right;
    homepage.element_top_left = body.element_top_left;
    homepage.background = body.background;
    homepage.frame = body.frame;
    homepage.animation = body.animation;
    homepage.color = body.color;
    homepage.font = body.font;

    const result = await this.homepageRepository.save(homepage);
    return result;
  }

  private async createOpening(body: any): Promise<any> {
    const opening = new Opening();
    opening.element_bot_left = body.element_bot_left;
    opening.element_bot_right = body.element_bot_right;
    opening.element_top_left = body.element_top_left;
    opening.element_top_right = body.element_top_right;
    opening.background = body.background;
    opening.frame = body.frame;
    opening.animation = body.animation;
    opening.color = body.color;
    opening.font = body.font;

    const result = await this.openingRepository.save(opening);
    return result;
  }

  private async createBrideGroom(body: any): Promise<any> {
    const brideGroom = new BrideGroom();
    brideGroom.element_bot_right = body.element_bot_right;
    brideGroom.element_bot_left = body.element_bot_left;
    brideGroom.element_top_left = body.element_top_left;
    brideGroom.element_top_right = body.element_top_right;
    brideGroom.background = body.background;
    brideGroom.frame = body.frame;
    brideGroom.animation = body.animation;
    brideGroom.color = body.color;
    brideGroom.font = body.font;

    const result = await this.brideGroomRepository.save(brideGroom);
    return result;
  }

  private async createVenueDate(body: any): Promise<any> {
    const venueDate = new VenueDate();
    venueDate.element_bot_right = body.element_bot_right;
    venueDate.element_bot_left = body.element_bot_left;
    venueDate.element_top_left = body.element_top_left;
    venueDate.element_top_right = body.element_top_right;
    venueDate.background = body.background;
    venueDate.frame = body.frame;
    venueDate.animation = body.animation;
    venueDate.color = body.color;
    venueDate.font = body.font;

    const result = await this.venueDateRepository.save(venueDate);
    return result;
  }

  private async createGallery(body: any): Promise<any> {
    const gallery = new Gallery();
    gallery.element_bot_left = body.element_bot_left;
    gallery.element_bot_right = body.element_bot_right;
    gallery.element_top_left = body.element_top_left;
    gallery.element_top_right = body.element_top_right;
    gallery.background = body.background;
    gallery.frame = body.frame;
    gallery.animation = body.animation;
    gallery.color = body.color;
    gallery.font = body.font;

    const result = await this.galleryRepository.save(gallery);
    return result;
  }

  private async createLoveStory(body: any): Promise<any> {
    const loveStory = new LoveStory();
    loveStory.element_bot_left = body.element_bot_left;
    loveStory.element_bot_right = body.element_bot_right;
    loveStory.element_top_right = body.element_top_right;
    loveStory.element_top_left = body.element_top_left;
    loveStory.background = body.background;
    loveStory.frame = body.frame;
    loveStory.animation = body.animation;
    loveStory.color = body.color;
    loveStory.font = body.font;

    const result = await this.loveStoryRepository.save(loveStory);
    return result;
  }

  private async createLiveStreaming(body: any): Promise<any> {
    const liveStreaming = new LiveStreaming();
    liveStreaming.element_bot_left = body.element_bot_left;
    liveStreaming.element_bot_right = body.element_bot_right;
    liveStreaming.element_top_right = body.element_top_right;
    liveStreaming.element_top_left = body.element_top_left;
    liveStreaming.background = body.background;
    liveStreaming.frame = body.frame;
    liveStreaming.animation = body.animation;
    liveStreaming.color = body.color;
    liveStreaming.font = body.font;

    const result = await this.liveStreamingRepository.save(liveStreaming);
    return result;
  }

  private async createRsvp(body: any): Promise<any> {
    const rsvp = new Rsvp();
    rsvp.element_bot_right = body.element_bot_right;
    rsvp.element_bot_left = body.element_bot_left;
    rsvp.element_top_left = body.element_top_left;
    rsvp.element_top_right = body.element_top_right;
    rsvp.background = body.background;
    rsvp.frame = body.frame;
    rsvp.animation = body.animation;
    rsvp.color = body.color;
    rsvp.font = body.font;

    const result = await this.rsvpRepository.save(rsvp);
    return result;
  }

  private async createGiftCorner(body: any): Promise<any> {
    const giftCorner = new GiftCorner();
    giftCorner.element_bot_left = body.element_bot_left;
    giftCorner.element_bot_right = body.element_bot_right;
    giftCorner.element_top_left = body.element_top_left;
    giftCorner.element_top_right = body.element_top_right;
    giftCorner.background = body.background;
    giftCorner.frame = body.frame;
    giftCorner.animation = body.animation;
    giftCorner.color = body.color;
    giftCorner.font = body.font;

    const result = await this.giftCornerRepository.save(giftCorner);
    return result;
  }

  private async createWishlist(body: any): Promise<any> {
    const wishlist = new Wishlist();
    wishlist.element_bot_right = body.element_bot_right;
    wishlist.element_bot_left = body.element_bot_left;
    wishlist.element_top_left = body.element_top_left;
    wishlist.element_top_right = body.element_top_right;
    wishlist.background = body.background;
    wishlist.frame = body.frame;
    wishlist.animation = body.animation;
    wishlist.color = body.color;
    wishlist.font = body.font;

    const result = await this.wishlistRepository.save(wishlist);
    return result;
  }

  private async createClosing(body: any): Promise<any> {
    const closing = new Closing();
    closing.element_bot_left = body.element_bot_left;
    closing.element_bot_right = body.element_bot_right;
    closing.element_top_left = body.element_top_left;
    closing.element_top_right = body.element_top_right;
    closing.background = body.background;
    closing.frame = body.frame;
    closing.animation = body.animation;
    closing.color = body.color;
    closing.font = body.font;

    const result = await this.closingRepository.save(closing);
    return result;
  }

  private async updateHomepage(id: any, body: any): Promise<any> {
    const homepage = await this.homepageRepository.findOne({
      where: { id }
    });
    if (!homepage) {
      throw new HttpException('Homepage not found', 404);
    }
    homepage.element_bot_right = body.element_bot_right
      ? body.element_bot_right
      : homepage.element_bot_right;
    homepage.element_bot_left = body.element_bot_left
      ? body.element_bot_left
      : homepage.element_bot_left;
    homepage.element_top_left = body.element_top_left
      ? body.element_top_left
      : homepage.element_top_left;
    homepage.element_top_right = body.element_top_right
      ? body.element_top_right
      : homepage.element_top_right;
    homepage.background = body.background
      ? body.background
      : homepage.background;
    homepage.frame = body.frame ? body.frame : homepage.frame;
    homepage.animation = body.animation ? body.animation : homepage.animation;
    homepage.color = body.color ? body.color : homepage.color;
    homepage.font = body.font ? body.font : homepage.font;

    await this.homepageRepository.update(id, homepage);
    return {
      statusCode: 200,
      message: 'Homepage updated successfully'
    };
  }

  private async updateOpening(id: any, body: any): Promise<any> {
    const opening = await this.openingRepository.findOne({
      where: { id }
    });
    if (!opening) {
      throw new HttpException('Opening not found', 404);
    }
    opening.element_bot_left = body.element_bot_left
      ? body.element_bot_left
      : opening.element_bot_left;
    opening.element_bot_right = body.element_bot_right
      ? body.element_bot_right
      : opening.element_bot_right;
    opening.element_top_left = body.element_top_left
      ? body.element_top_left
      : opening.element_top_left;
    opening.element_top_right = body.element_top_right
      ? body.element_top_right
      : opening.element_top_right;
    opening.background = body.background ? body.background : opening.background;
    opening.frame = body.frame ? body.frame : opening.frame;
    opening.animation = body.animation ? body.animation : opening.animation;
    opening.color = body.color ? body.color : opening.color;
    opening.font = body.font ? body.font : opening.font;

    await this.openingRepository.update(id, opening);
    return {
      statusCode: 200,
      message: 'Opening updated successfully'
    };
  }

  private async updateBrideGroom(id: any, body: any): Promise<any> {
    const brideGroom = await this.brideGroomRepository.findOne({
      where: { id }
    });
    if (!brideGroom) {
      throw new HttpException('BrideGroom not found', 404);
    }
    brideGroom.element_bot_left = body.element_bot_left
      ? body.element_bot_left
      : brideGroom.element_bot_left;
    brideGroom.element_bot_right = body.element_bot_right
      ? body.element_bot_right
      : brideGroom.element_bot_right;
    brideGroom.element_top_left = body.element_top_left
      ? body.element_top_left
      : brideGroom.element_top_left;
    brideGroom.element_top_right = body.element_top_right
      ? body.element_top_right
      : brideGroom.element_top_right;
    brideGroom.background = body.background
      ? body.background
      : brideGroom.background;
    brideGroom.frame = body.frame ? body.frame : brideGroom.frame;
    brideGroom.animation = body.animation
      ? body.animation
      : brideGroom.animation;
    brideGroom.color = body.color ? body.color : brideGroom.color;
    brideGroom.font = body.font ? body.font : brideGroom.font;

    await this.brideGroomRepository.update(id, brideGroom);
    return {
      statusCode: 200,
      message: 'BrideGroom updated successfully'
    };
  }

  private async updateVenueDate(id: any, body: any): Promise<any> {
    const venueDate = await this.venueDateRepository.findOne({
      where: { id }
    });
    if (!venueDate) {
      throw new HttpException('VenueDate not found', 404);
    }
    venueDate.element_bot_right = body.element_bot_right
      ? body.element_bot_right
      : venueDate.element_bot_right;
    venueDate.element_bot_left = body.element_bot_left
      ? body.element_bot_left
      : venueDate.element_bot_left;
    venueDate.element_top_left = body.element_top_left
      ? body.element_top_left
      : venueDate.element_top_left;
    venueDate.element_top_right = body.element_top_right
      ? body.element_top_right
      : venueDate.element_top_right;
    venueDate.background = body.background
      ? body.background
      : venueDate.background;
    venueDate.frame = body.frame ? body.frame : venueDate.frame;
    venueDate.animation = body.animation ? body.animation : venueDate.animation;
    venueDate.color = body.color ? body.color : venueDate.color;
    venueDate.font = body.font ? body.font : venueDate.font;

    await this.venueDateRepository.update(id, venueDate);
    return {
      statusCode: 200,
      message: 'VenueDate updated successfully'
    };
  }

  private async updateGallery(id: any, body: any): Promise<any> {
    const gallery = await this.galleryRepository.findOne({
      where: { id }
    });
    if (!gallery) {
      throw new HttpException('Gallery not found', 404);
    }
    gallery.element_bot_right = body.element_bot_right
      ? body.element_bot_right
      : gallery.element_bot_right;
    gallery.element_bot_left = body.element_bot_left
      ? body.element_bot_left
      : gallery.element_bot_left;
    gallery.element_top_left = body.element_top_left
      ? body.element_top_left
      : gallery.element_top_left;
    gallery.element_top_right = body.element_top_right
      ? body.element_top_right
      : gallery.element_top_right;
    gallery.background = body.background ? body.background : gallery.background;
    gallery.frame = body.frame ? body.frame : gallery.frame;
    gallery.animation = body.animation ? body.animation : gallery.animation;
    gallery.color = body.color ? body.color : gallery.color;
    gallery.font = body.font ? body.font : gallery.font;

    await this.galleryRepository.update(id, gallery);
    return {
      statusCode: 200,
      message: 'Gallery updated successfully'
    };
  }

  private async updateLoveStory(id: any, body: any): Promise<any> {
    const loveStory = await this.loveStoryRepository.findOne({
      where: { id }
    });
    if (!loveStory) {
      throw new HttpException('LoveStory not found', 404);
    }
    loveStory.element_bot_left = body.element_bot_left
      ? body.element_bot_left
      : loveStory.element_bot_left;
    loveStory.element_bot_right = body.element_bot_right
      ? body.element_bot_right
      : loveStory.element_bot_right;
    loveStory.element_top_left = body.element_top_left
      ? body.element_top_left
      : loveStory.element_top_left;
    loveStory.element_top_right = body.element_top_right
      ? body.element_top_right
      : loveStory.element_top_right;
    loveStory.background = body.background
      ? body.background
      : loveStory.background;
    loveStory.frame = body.frame ? body.frame : loveStory.frame;
    loveStory.animation = body.animation ? body.animation : loveStory.animation;
    loveStory.color = body.color ? body.color : loveStory.color;
    loveStory.font = body.font ? body.font : loveStory.font;

    await this.loveStoryRepository.update(id, loveStory);
    return {
      statusCode: 200,
      message: 'LoveStory updated successfully'
    };
  }

  private async updateLiveStreaming(id: any, body: any): Promise<any> {
    const liveStreaming = await this.liveStreamingRepository.findOne({
      where: { id }
    });
    if (!liveStreaming) {
      throw new HttpException('LiveStreaming not found', 404);
    }
    liveStreaming.element_bot_left = body.element_bot_left
      ? body.element_bot_left
      : liveStreaming.element_bot_left;
    liveStreaming.element_bot_right = body.element_bot_right
      ? body.element_bot_right
      : liveStreaming.element_bot_right;
    liveStreaming.element_top_left = body.element_top_left
      ? body.element_top_left
      : liveStreaming.element_top_left;
    liveStreaming.element_top_right = body.element_top_right
      ? body.element_top_right
      : liveStreaming.element_top_right;
    liveStreaming.background = body.background
      ? body.background
      : liveStreaming.background;
    liveStreaming.frame = body.frame ? body.frame : liveStreaming.frame;
    liveStreaming.animation = body.animation
      ? body.animation
      : liveStreaming.animation;
    liveStreaming.color = body.color ? body.color : liveStreaming.color;
    liveStreaming.font = body.font ? body.font : liveStreaming.font;

    await this.liveStreamingRepository.update(id, liveStreaming);
    return {
      statusCode: 200,
      message: 'LiveStreaming updated successfully'
    };
  }

  private async updateRsvp(id: any, body: any): Promise<any> {
    const rsvp = await this.rsvpRepository.findOne({
      where: { id }
    });
    if (!rsvp) {
      throw new HttpException('Rsvp not found', 404);
    }
    rsvp.element_bot_left = body.element_bot_left
      ? body.element_bot_left
      : rsvp.element_bot_left;
    rsvp.element_bot_right = body.element_bot_right
      ? body.element_bot_right
      : rsvp.element_bot_right;
    rsvp.element_top_right = body.element_top_right
      ? body.element_top_right
      : rsvp.element_top_right;
    rsvp.element_top_left = body.element_top_left
      ? body.element_top_left
      : rsvp.element_top_left;
    rsvp.background = body.background ? body.background : rsvp.background;
    rsvp.frame = body.frame ? body.frame : rsvp.frame;
    rsvp.animation = body.animation ? body.animation : rsvp.animation;
    rsvp.color = body.color ? body.color : rsvp.color;
    rsvp.font = body.font ? body.font : rsvp.font;

    await this.rsvpRepository.update(id, rsvp);
    return {
      statusCode: 200,
      message: 'Rsvp updated successfully'
    };
  }

  private async updateGiftCorner(id: any, body: any): Promise<any> {
    const giftCorner = await this.giftCornerRepository.findOne({
      where: { id }
    });
    if (!giftCorner) {
      throw new HttpException('GiftCorner not found', 404);
    }
    giftCorner.element_bot_left = body.element_bot_left
      ? body.element_bot_left
      : giftCorner.element_bot_left;
    giftCorner.element_bot_right = body.element_bot_right
      ? body.element_bot_right
      : giftCorner.element_bot_right;
    giftCorner.element_top_left = body.element_top_left
      ? body.element_top_left
      : giftCorner.element_top_left;
    giftCorner.element_top_right = body.element_top_right
      ? body.element_top_right
      : giftCorner.element_top_right;
    giftCorner.background = body.background
      ? body.background
      : giftCorner.background;
    giftCorner.frame = body.frame ? body.frame : giftCorner.frame;
    giftCorner.animation = body.animation
      ? body.animation
      : giftCorner.animation;
    giftCorner.color = body.color ? body.color : giftCorner.color;
    giftCorner.font = body.font ? body.font : giftCorner.font;

    await this.giftCornerRepository.update(id, giftCorner);
    return {
      statusCode: 200,
      message: 'GiftCorner updated successfully'
    };
  }

  private async updateWishlist(id: any, body: any): Promise<any> {
    const wishlist = await this.wishlistRepository.findOne({
      where: { id }
    });
    if (!wishlist) {
      throw new HttpException('Wishlist not found', 404);
    }
    wishlist.element_bot_right = body.element_bot_right
      ? body.element_bot_right
      : wishlist.element_bot_right;
    wishlist.element_bot_left = body.element_bot_left
      ? body.element_bot_left
      : wishlist.element_bot_left;
    wishlist.element_top_left = body.element_top_left
      ? body.element_top_left
      : wishlist.element_top_left;
    wishlist.element_top_right = body.element_top_right
      ? body.element_top_right
      : wishlist.element_top_right;
    wishlist.background = body.background
      ? body.background
      : wishlist.background;
    wishlist.frame = body.frame ? body.frame : wishlist.frame;
    wishlist.animation = body.animation ? body.animation : wishlist.animation;
    wishlist.color = body.color ? body.color : wishlist.color;
    wishlist.font = body.font ? body.font : wishlist.font;

    await this.wishlistRepository.update(id, wishlist);
    return {
      statusCode: 200,
      message: 'Wishlist updated successfully'
    };
  }

  private async updateClosing(id: any, body: any): Promise<any> {
    const closing = await this.closingRepository.findOne({
      where: { id }
    });
    if (!closing) {
      throw new HttpException('Closing not found', 404);
    }
    closing.element_bot_right = body.element_bot_right
      ? body.element_bot_right
      : closing.element_bot_right;
    closing.element_bot_left = body.element_bot_left
      ? body.element_bot_left
      : closing.element_bot_left;
    closing.element_top_left = body.element_top_left
      ? body.element_top_left
      : closing.element_top_left;
    closing.element_top_right = body.element_top_right
      ? body.element_top_right
      : closing.element_top_right;
    closing.background = body.background ? body.background : closing.background;
    closing.frame = body.frame ? body.frame : closing.frame;
    closing.animation = body.animation ? body.animation : closing.animation;
    closing.color = body.color ? body.color : closing.color;
    closing.font = body.font ? body.font : closing.font;

    await this.closingRepository.update(id, closing);
    return {
      statusCode: 200,
      message: 'Closing updated successfully'
    };
  }

  private async joinTable(): Promise<any> {
    return {
      homepage: {
        element_bot_right: true,
        element_bot_left: true,
        element_top_right: true,
        element_top_left: true,
        background: true,
        frame: true,
        animation: true,
        color: true,
        font: true
      },
      opening: {
        element_bot_right: true,
        element_bot_left: true,
        element_top_right: true,
        element_top_left: true,
        background: true,
        frame: true,
        animation: true,
        color: true,
        font: true
      },
      bride_groom: {
        element_bot_right: true,
        element_bot_left: true,
        element_top_right: true,
        element_top_left: true,
        background: true,
        frame: true,
        animation: true,
        color: true,
        font: true
      },
      venue_date: {
        element_bot_right: true,
        element_bot_left: true,
        element_top_right: true,
        element_top_left: true,
        background: true,
        frame: true,
        animation: true,
        color: true,
        font: true
      },
      gallery: {
        element_bot_right: true,
        element_bot_left: true,
        element_top_right: true,
        element_top_left: true,
        background: true,
        frame: true,
        animation: true,
        color: true,
        font: true
      },
      love_story: {
        element_bot_right: true,
        element_bot_left: true,
        element_top_right: true,
        element_top_left: true,
        background: true,
        frame: true,
        animation: true,
        color: true,
        font: true
      },
      live_streaming: {
        element_bot_right: true,
        element_bot_left: true,
        element_top_right: true,
        element_top_left: true,
        background: true,
        frame: true,
        animation: true,
        color: true,
        font: true
      },
      rsvp: {
        element_bot_right: true,
        element_bot_left: true,
        element_top_right: true,
        element_top_left: true,
        background: true,
        frame: true,
        animation: true,
        color: true,
        font: true
      },
      gift_corner: {
        element_bot_right: true,
        element_bot_left: true,
        element_top_right: true,
        element_top_left: true,
        background: true,
        frame: true,
        animation: true,
        color: true,
        font: true
      },
      wishlist: {
        element_bot_right: true,
        element_bot_left: true,
        element_top_right: true,
        element_top_left: true,
        background: true,
        frame: true,
        animation: true,
        color: true,
        font: true
      },
      closing: {
        element_bot_right: true,
        element_bot_left: true,
        element_top_right: true,
        element_top_left: true,
        background: true,
        frame: true,
        animation: true,
        color: true,
        font: true
      },
      user_package_template: {
        user: true
      },
      custom_page_order: true
    };
  }
}
