import { Module } from '@nestjs/common';
import { ElementController } from './element.controller';
import { ElementService } from './element.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElementBot } from '@/migrations/element_bot.entity';
import { ElementTop } from '@/migrations/element_top.entity';
import { Background } from '@/migrations/background.entity';
import { Color } from '@/migrations/color.entity';
import { Animation } from '@/migrations/animation.entity';
import { Frame } from '@/migrations/frame.entity';
import { AuthModule } from '@/api/auth/auth.module';
import { Font } from '@/migrations/font.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ElementBot,
      ElementTop,
      Background,
      Animation,
      Color,
      Frame,
      Font
    ]),
    AuthModule
  ],
  controllers: [ElementController],
  providers: [ElementService]
})
export class ElementModule {}
