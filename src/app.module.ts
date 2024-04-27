import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
// import { getEnvPath } from './common/helper/env.helper';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';
// import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { EmailModule } from './email/email.module';

// const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [
    // ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    ApiModule,
    EmailModule
    // ThrottlerModule.forRoot([
    //   {
    //     ttl: 10,
    //     limit: 2
    //   }
    // ])
  ],
  controllers: [AppController],
  providers: [
    AppService
    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard
    // }
  ]
})
export class AppModule {}
