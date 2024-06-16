import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Inject,
  Post,
  UseInterceptors
} from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  @Inject(EmailService)
  private readonly emailService: EmailService;

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  private sendEmail(@Body() body: any): Promise<any> {
    return this.emailService.sendEmail(body);
  }
}
