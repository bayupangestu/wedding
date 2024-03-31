import { HttpException, Injectable } from '@nestjs/common';
import { ElementBot } from '@/migrations/element_bot.entity';
import { ElementTop } from '@/migrations/element_top.entity';
import { Background } from '@/migrations/background.entity';
import { Color } from '@/migrations/color.entity';
import { Animation } from '@/migrations/animation.entity';
import { Frame } from '@/migrations/frame.entity';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import { CreateElementDto, UpdateElementDto } from './element.dto';
import { Font } from '@/migrations/font.entity';

@Injectable()
export class ElementService {
  @InjectRepository(ElementBot)
  private readonly elementBotRepository: Repository<ElementBot>;

  @InjectRepository(ElementTop)
  private readonly elementTopRepository: Repository<ElementTop>;

  @InjectRepository(Background)
  private readonly backgroundRepository: Repository<Background>;

  @InjectRepository(Color)
  private readonly colorRepository: Repository<Color>;

  @InjectRepository(Animation)
  private readonly animationRepository: Repository<Animation>;

  @InjectRepository(Frame)
  private readonly frameRepository: Repository<Frame>;

  @InjectRepository(Font)
  private readonly fontRepository: Repository<Font>;

  public async create(body: CreateElementDto, file: any): Promise<any> {
    if (body.element === 'element-bot') {
      return await this.createElementBot(body, file);
    } else if (body.element === 'element-top') {
      return await this.createElementTop(body, file);
    } else if (body.element === 'background') {
      return await this.createBackground(body, file);
    } else if (body.element === 'color') {
      return await this.createColor(body);
    } else if (body.element === 'animation') {
      return await this.createAnimation(body);
    } else if (body.element === 'frame') {
      return await this.createFrame(body, file);
    } else if (body.element === 'font') {
      return await this.createFont(body);
    }
  }

  public async update(
    id: number,
    body: UpdateElementDto,
    file: any
  ): Promise<any> {
    if (body.element === 'element-bot') {
      return await this.updateElementBot(id, body, file);
    } else if (body.element === 'element-top') {
      return await this.updateElementTop(id, body, file);
    } else if (body.element === 'background') {
      return await this.updateBackground(id, body, file);
    } else if (body.element === 'color') {
      return await this.updateColor(id, body);
    } else if (body.element === 'animation') {
      return await this.updateAnimation(id, body);
    } else if (body.element === 'frame') {
      return await this.updateFrame(id, body, file);
    } else if (body.element === 'font') {
      return await this.updateFont(id, body);
    }
  }

  public async delete(id: number, element: string): Promise<any> {
    if (element === 'element-bot') {
      return await this.deleteElementBot(id);
    } else if (element === 'element-top') {
      return await this.deleteElementTop(id);
    } else if (element === 'background') {
      return await this.deleteBackground(id);
    } else if (element === 'color') {
      return await this.deleteColor(id);
    } else if (element === 'animation') {
      return await this.deleteAnimation(id);
    } else if (element === 'frame') {
      return await this.deleteFrame(id);
    } else if (element === 'font') {
      return await this.deleteFont(id);
    }
  }

  public async findAll(query: any): Promise<any> {
    if (query.element === 'element-bot') {
      return await this.findAllBotElement(query);
    } else if (query.element === 'element-top') {
      return await this.findAllTopElement(query);
    } else if (query.element === 'background') {
      return await this.findAllBackground(query);
    } else if (query.element === 'color') {
      return await this.findAllColor(query);
    } else if (query.element === 'animation') {
      return await this.findAllAnimation(query);
    } else if (query.element === 'frame') {
      return await this.findAllFrame(query);
    } else if (query.element === 'font') {
      return await this.findAllFont(query);
    }
  }

  public async findOne(id: number, element: string): Promise<any> {
    if (element === 'element-bot') {
      return await this.findOneBotElement(id);
    } else if (element === 'element-top') {
      return await this.findOneTopElement(id);
    } else if (element === 'background') {
      return await this.findOneBackground(id);
    } else if (element === 'color') {
      return await this.findOneColor(id);
    } else if (element === 'animation') {
      return await this.findOneAnimation(id);
    } else if (element === 'frame') {
      return await this.findOneFrame(id);
    } else if (element === 'font') {
      return await this.findOneFont(id);
    }
  }

  private async findAllBotElement(query: any): Promise<any> {
    if (query.type === 'form') {
      const result = await this.elementBotRepository.find();
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
        where: {}
      };
      if (query.search) {
        option.where = {
          name: ILike(`%${query.search}%`)
        };
      }
      const [result, total] = await this.elementBotRepository.findAndCount(
        option
      );
      return {
        statusCode: 200,
        total,
        page: query.page,
        pageSize: query.pageSize,
        result
      };
    }
  }

  private async findOneBotElement(id: number): Promise<any> {
    const result = await this.elementBotRepository.findOne({
      where: {
        id
      }
    });
    if (!result) {
      throw new HttpException('Element Bot Not found', 404);
    }
    return {
      statusCode: 200,
      result
    };
  }

  private async findAllTopElement(query: any): Promise<any> {
    if (query.type === 'form') {
      const result = await this.elementTopRepository.find();
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
        where: {}
      };
      if (query.search) {
        option.where = {
          name: ILike(`%${query.search}%`)
        };
      }
      const [result, total] = await this.elementTopRepository.findAndCount(
        option
      );
      return {
        statusCode: 200,
        total,
        page: query.page,
        pageSize: query.pageSize,
        result
      };
    }
  }

  private async findOneTopElement(id: number): Promise<any> {
    const result = await this.elementTopRepository.findOne({
      where: {
        id
      }
    });
    if (!result) {
      throw new HttpException('Element Top Not found', 404);
    }
    return {
      statusCode: 200,
      result
    };
  }

  private async findAllBackground(query: any): Promise<any> {
    if (query.type === 'form') {
      const result = await this.backgroundRepository.find();
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
        where: {}
      };
      if (query.search) {
        option.where = {
          name: ILike(`%${query.search}%`)
        };
      }
      const [result, total] = await this.backgroundRepository.findAndCount(
        option
      );
      return {
        statusCode: 200,
        total,
        page: query.page,
        pageSize: query.pageSize,
        result
      };
    }
  }

  private async findOneBackground(id: number): Promise<any> {
    const result = await this.backgroundRepository.findOne({
      where: {
        id
      }
    });
    if (!result) {
      throw new HttpException('Background Not found', 404);
    }
    return {
      statusCode: 200,
      result
    };
  }

  private async findAllColor(query: any): Promise<any> {
    if (query.type === 'form') {
      const result = await this.colorRepository.find();
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
        where: {}
      };
      if (query.search) {
        option.where = {
          name: ILike(`%${query.search}%`)
        };
      }
      const [result, total] = await this.colorRepository.findAndCount(option);
      return {
        statusCode: 200,
        total,
        page: query.page,
        pageSize: query.pageSize,
        result
      };
    }
  }

  private async findOneColor(id: number): Promise<any> {
    const result = await this.colorRepository.findOne({
      where: {
        id
      }
    });
    if (!result) {
      throw new HttpException('Color Not found', 404);
    }
    return {
      statusCode: 200,
      result
    };
  }

  private async findAllAnimation(query: any): Promise<any> {
    if (query.type === 'form') {
      const result = await this.animationRepository.find();
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
        where: {}
      };
      if (query.search) {
        option.where = {
          name: ILike(`%${query.search}%`)
        };
      }
      const [result, total] = await this.animationRepository.findAndCount(
        option
      );
      return {
        statusCode: 200,
        total,
        page: query.page,
        pageSize: query.pageSize,
        result
      };
    }
  }

  private async findOneAnimation(id: number): Promise<any> {
    const result = await this.animationRepository.findOne({
      where: {
        id
      }
    });
    if (!result) {
      throw new HttpException('Animation Not found', 404);
    }
    return {
      statusCode: 200,
      result
    };
  }

  private async findAllFrame(query: any): Promise<any> {
    if (query.type === 'form') {
      const result = await this.frameRepository.find();
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
        where: {}
      };
      if (query.search) {
        option.where = {
          name: ILike(`%${query.search}%`)
        };
      }
      const [result, total] = await this.frameRepository.findAndCount(option);
      return {
        statusCode: 200,
        total,
        page: query.page,
        pageSize: query.pageSize,
        result
      };
    }
  }

  private async findOneFrame(id: number): Promise<any> {
    const result = await this.frameRepository.findOne({
      where: {
        id
      }
    });
    if (!result) {
      throw new HttpException('Frame Not found', 404);
    }
    return {
      statusCode: 200,
      result
    };
  }

  private async findAllFont(query: any): Promise<any> {
    if (query.type === 'form') {
      const result = await this.fontRepository.find();
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
        where: {}
      };
      if (query.search) {
        option.where = {
          name: ILike(`%${query.search}%`)
        };
      }
      const [result, total] = await this.fontRepository.findAndCount(option);
      return {
        statusCode: 200,
        total,
        page: query.page,
        pageSize: query.pageSize,
        result
      };
    }
  }

  private async findOneFont(id: number): Promise<any> {
    const result = await this.fontRepository.findOne({
      where: {
        id
      }
    });
    if (!result) {
      throw new HttpException('Font Not found', 404);
    }
    return {
      statusCode: 200,
      result
    };
  }

  private async createElementBot(body: CreateElementDto, file: any) {
    const bitmap = fs.readFileSync(file.path);
    const asset = Buffer.from(bitmap).toString('base64');
    const elementBot = new ElementBot();
    elementBot.name = body.name;
    elementBot.asset = asset;
    await this.elementBotRepository.save(elementBot);
    return {
      statusCode: 201,
      message: 'Element Bot Created'
    };
  }

  private async createElementTop(body: CreateElementDto, file: any) {
    const bitmap = fs.readFileSync(file.path);
    const asset = Buffer.from(bitmap).toString('base64');
    const elementTop = new ElementTop();
    elementTop.name = body.name;
    elementTop.asset = asset;
    await this.elementTopRepository.save(elementTop);
    return {
      statusCode: 201,
      message: 'Element Top Created'
    };
  }

  private async createBackground(body: CreateElementDto, file: any) {
    const bitmap = fs.readFileSync(file.path);
    const asset = Buffer.from(bitmap).toString('base64');
    const background = new Background();
    background.name = body.name;
    background.asset = asset;
    await this.backgroundRepository.save(background);
    return {
      statusCode: 201,
      message: 'Background Created'
    };
  }

  private async createColor(body: CreateElementDto) {
    const color = new Color();
    color.name = body.name;
    await this.colorRepository.save(color);
    return {
      statusCode: 201,
      message: 'Color Created'
    };
  }

  private async createAnimation(body: CreateElementDto) {
    const animation = new Animation();
    animation.name = body.name;
    await this.animationRepository.save(animation);
    return {
      statusCode: 201,
      message: 'Animation Created'
    };
  }

  private async createFrame(body: CreateElementDto, file: any) {
    const bitmap = fs.readFileSync(file.path);
    const asset = Buffer.from(bitmap).toString('base64');
    const frame = new Frame();
    frame.name = body.name;
    frame.asset = asset;
    await this.frameRepository.save(frame);
    return {
      statusCode: 201,
      message: 'Frame Created'
    };
  }

  private async createFont(body: CreateElementDto) {
    const font = new Font();
    font.name = body.name;
    await this.fontRepository.save(font);
    return {
      statusCode: 201,
      message: 'Font Created'
    };
  }

  private async updateElementBot(id: number, body: any, file: any) {
    const elementBot = await this.elementBotRepository.findOne({
      where: {
        id
      }
    });
    if (!elementBot) {
      throw new HttpException('Element Bot Not found', 404);
    }
    if (body.name) {
      elementBot.name = body.name;
    }
    if (file) {
      const bitmap = fs.readFileSync(file);
      elementBot.asset = Buffer.from(bitmap).toString('base64');
    }
    await this.elementBotRepository.update(id, elementBot);
    return {
      statusCode: 200,
      message: 'Element Bot updated successfully'
    };
  }

  private async updateElementTop(id: number, body: any, file: any) {
    const elementTop = await this.elementTopRepository.findOne({
      where: {
        id
      }
    });
    if (!elementTop) {
      throw new HttpException('Element Top Not found', 404);
    }
    if (body.name) {
      elementTop.name = body.name;
    }
    if (file) {
      const bitmap = fs.readFileSync(file);
      elementTop.asset = Buffer.from(bitmap).toString('base64');
    }
    await this.elementTopRepository.update(id, elementTop);
    return {
      statusCode: 200,
      message: 'Element Top updated successfully'
    };
  }

  private async updateBackground(id: number, body: any, file: any) {
    const background = await this.backgroundRepository.findOne({
      where: {
        id
      }
    });
    if (!background) {
      throw new HttpException('Background Not found', 404);
    }
    if (body.name) {
      background.name = body.name;
    }
    if (file) {
      const bitmap = fs.readFileSync(file);
      background.asset = Buffer.from(bitmap).toString('base64');
    }
    await this.backgroundRepository.update(id, background);
    return {
      statusCode: 200,
      message: 'Background updated successfully'
    };
  }

  private async updateColor(id: number, body: any) {
    const color = await this.colorRepository.findOne({
      where: {
        id
      }
    });
    if (!color) {
      throw new HttpException('Color Not found', 404);
    }

    color.name = body.name;

    await this.colorRepository.update(id, color);
    return {
      statusCode: 200,
      message: 'Color updated successfully'
    };
  }

  private async updateAnimation(id: number, body: any) {
    const animation = await this.animationRepository.findOne({
      where: {
        id
      }
    });
    if (!animation) {
      throw new HttpException('Animation Not found', 404);
    }

    animation.name = body.name;

    await this.animationRepository.update(id, animation);
    return {
      statusCode: 200,
      message: 'Animation updated successfully'
    };
  }

  private async updateFrame(id: number, body: any, file: any) {
    const frame = await this.frameRepository.findOne({
      where: {
        id
      }
    });
    if (!frame) {
      throw new HttpException('Frame Not found', 404);
    }
    if (body.name) {
      frame.name = body.name;
    }
    if (file) {
      const bitmap = fs.readFileSync(file);
      frame.asset = Buffer.from(bitmap).toString('base64');
    }
    await this.frameRepository.update(id, frame);
    return {
      statusCode: 200,
      message: 'Frame updated successfully'
    };
  }

  private async updateFont(id: number, body: any) {
    const font = await this.fontRepository.findOne({
      where: {
        id
      }
    });
    if (!font) {
      throw new HttpException('Font Not found', 404);
    }

    font.name = body.name;

    await this.fontRepository.update(id, font);
    return {
      statusCode: 200,
      message: 'Font updated successfully'
    };
  }

  private async deleteElementBot(id: number) {
    const elementBot = await this.elementBotRepository.findOne({
      where: {
        id
      }
    });
    if (!elementBot) {
      throw new HttpException('Element Bot Not found', 404);
    }
    await this.elementBotRepository.softDelete(id);
    return {
      statusCode: 200,
      message: 'Element Bot deleted successfully'
    };
  }

  private async deleteElementTop(id: number) {
    const elementTop = await this.elementTopRepository.findOne({
      where: {
        id
      }
    });
    if (!elementTop) {
      throw new HttpException('Element Top Not found', 404);
    }
    await this.elementTopRepository.softDelete(id);
    return {
      statusCode: 200,
      message: 'Element Top deleted successfully'
    };
  }

  private async deleteBackground(id: number) {
    const background = await this.backgroundRepository.findOne({
      where: {
        id
      }
    });
    if (!background) {
      throw new HttpException('Background Not found', 404);
    }
    await this.backgroundRepository.softDelete(id);
    return {
      statusCode: 200,
      message: 'Background deleted successfully'
    };
  }

  private async deleteColor(id: number) {
    const color = await this.colorRepository.findOne({
      where: {
        id
      }
    });
    if (!color) {
      throw new HttpException('Color Not found', 404);
    }
    await this.colorRepository.softDelete(id);
    return {
      statusCode: 200,
      message: 'Color deleted successfully'
    };
  }

  private async deleteAnimation(id: number) {
    const animation = await this.animationRepository.findOne({
      where: {
        id
      }
    });
    if (!animation) {
      throw new HttpException('Animation Not found', 404);
    }
    await this.animationRepository.softDelete(id);
    return {
      statusCode: 200,
      message: 'Animation deleted successfully'
    };
  }

  private async deleteFrame(id: number) {
    const frame = await this.frameRepository.findOne({
      where: {
        id
      }
    });
    if (!frame) {
      throw new HttpException('Frame Not found', 404);
    }
    await this.frameRepository.softDelete(id);
    return {
      statusCode: 200,
      message: 'Frame deleted successfully'
    };
  }

  private async deleteFont(id: number) {
    const font = await this.fontRepository.findOne({
      where: {
        id
      }
    });
    if (!font) {
      throw new HttpException('Font Not found', 404);
    }
    await this.fontRepository.softDelete(id);
    return {
      statusCode: 200,
      message: 'Font deleted successfully'
    };
  }
}
