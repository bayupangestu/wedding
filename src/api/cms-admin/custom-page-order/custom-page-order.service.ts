import { CustomPageOrder } from '@/migrations/custom_page_order.entity';
import { Template } from '@/migrations/template.entity';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomPageOrderService {
  @InjectRepository(CustomPageOrder)
  private readonly customPageOrderRepository: Repository<CustomPageOrder>;

  @InjectRepository(Template)
  private readonly templateRepository: Repository<Template>;

  public async create(body: any): Promise<any> {
    const template = await this.templateRepository.findOne({
      where: {
        id: body.template_id
      }
    });
    if (!template) {
      throw new HttpException('Template not found', 404);
    }
    const queryRunner =
      this.customPageOrderRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const customPageOrder = new CustomPageOrder();
      customPageOrder.order_page = body.order_page;
      const resultCustomPageOrder = await queryRunner.manager.save(
        customPageOrder
      );
      template.custom_page_order = resultCustomPageOrder;
      await queryRunner.manager.update(Template, template.id, template);
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return resultCustomPageOrder;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      return error;
    }
  }

  public async findAll(): Promise<any> {
    return this.customPageOrderRepository.find();
  }

  public async findOne(id: number): Promise<any> {
    return this.customPageOrderRepository.findOne({
      where: {
        id
      }
    });
  }

  public async update(id: number, body: any): Promise<any> {
    const customPageOrder = await this.customPageOrderRepository.findOne({
      where: {
        id
      }
    });
    if (!customPageOrder) {
      throw new HttpException('Custom Page Order not found', 404);
    }
    await this.customPageOrderRepository.update(id, body);
    return this.customPageOrderRepository.findOne({
      where: {
        id
      }
    });
  }
}
