import { Controller, Inject } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  @Inject(EmailService)
  private readonly emailService: EmailService;
}
