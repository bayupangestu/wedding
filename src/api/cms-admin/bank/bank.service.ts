import { Bank } from '@/migrations/bank.entity';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import * as fs from 'fs';
import { CreateBankDto, UpdateBankDto } from './bank.dto';

@Injectable()
export class BankService {
  @InjectRepository(Bank)
  private readonly bankRepository: Repository<Bank>;

  public async findAll(query: any): Promise<any> {
    if (query.type === 'form') {
      const result = await this.bankRepository.find();
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
      const [result, total] = await this.bankRepository.findAndCount(option);
      return {
        statusCode: 200,
        total,
        page: query.page,
        pageSize: query.pageSize,
        result
      };
    }
  }

  public async findOne(id: number): Promise<any> {
    const result = await this.bankRepository.findOne({
      where: {
        id
      }
    });
    if (!result) {
      throw new HttpException('Bank Not found', 404);
    }
    return {
      statusCode: 200,
      result
    };
  }

  public async create(data: CreateBankDto, file: any): Promise<any> {
    const bitmap = fs.readFileSync(file.path);
    const asset = Buffer.from(bitmap).toString('base64');
    const bank = new Bank();
    bank.name = data.name;
    bank.asset = asset;
    await this.bankRepository.save(bank);
    return {
      statusCode: 201,
      message: 'Bank created successfully'
    };
  }

  public async update(
    id: number,
    body: UpdateBankDto,
    file: any
  ): Promise<any> {
    const bank = await this.bankRepository.findOne({
      where: {
        id
      }
    });
    if (!bank) {
      throw new HttpException('Bank Not found', 404);
    }
    bank.name = body.name;
    if (file) {
      const bitmap = fs.readFileSync(file);
      bank.asset = Buffer.from(bitmap).toString('base64');
    }
    await this.bankRepository.update(id, bank);
    return {
      statusCode: 200,
      message: 'Bank updated successfully'
    };
  }

  public async delete(id: number): Promise<any> {
    const bank = await this.bankRepository.findOne({
      where: {
        id
      }
    });
    if (!bank) {
      throw new HttpException('Bank Not found', 404);
    }
    await this.bankRepository.softDelete(id);
    return {
      statusCode: 200,
      message: 'Bank deleted successfully'
    };
  }
}
