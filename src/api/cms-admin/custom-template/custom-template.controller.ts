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
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { JwtAuthGuard } from '@/api/auth/auth.guard';
import { CustomTemplateService } from './custom-template.service';

@Controller('cms-admin/custom-template')
export class CustomTemplateController {
  @Inject(CustomTemplateService)
  private readonly customTemplateService: CustomTemplateService;

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private async findAll(@Query() query: any): Promise<any> {
    return this.customTemplateService.findAllTemplates(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private async findOne(@Param('id') id: number): Promise<any> {
    return this.customTemplateService.findOneTemplate(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  private async create(@Body() data: any, @Req() req: any): Promise<any> {
    return this.customTemplateService.createTemplate(data, req.user.id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private async update(
    @Param('id') id: number,
    @Body() data: any
  ): Promise<any> {
    return this.customTemplateService.updateTemplate(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private async delete(@Param('id') id: number): Promise<any> {
    return this.customTemplateService.deleteTemplate(id);
  }
}
