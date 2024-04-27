import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../../auth/auth.guard';
import { User } from '@/migrations/user.entity';
import { UserService } from './user.service';

@Controller('cms-admin/user')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private getProfile(@Query() query: any): Promise<User> {
    return this.service.getUsers(query);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private create(@Body() body: any): Promise<User> {
    return this.service.create(body);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private getById(@Param('id') id: number): Promise<User> {
    return this.service.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private update(@Param('id') id: number, @Body() body: any): Promise<User> {
    return this.service.update(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private delete(@Param('id') id: number): Promise<User> {
    return this.service.delete(id);
  }
}
