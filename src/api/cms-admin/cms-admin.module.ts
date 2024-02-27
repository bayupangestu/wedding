import { Module } from '@nestjs/common';
import { PackageModule } from './package/package.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { BankModule } from './bank/bank.module';
import { ListMenuModule } from './list_menu/list_menu.module';

@Module({
  imports: [PackageModule, ThrottlerModule.forRoot([{ ttl: 5, limit: 10 }]), BankModule, ListMenuModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})
export class CmsAdminModule {}
