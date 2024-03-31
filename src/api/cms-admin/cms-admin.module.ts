import { Module } from '@nestjs/common';
import { PackageModule } from './package/package.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { BankModule } from './bank/bank.module';
import { ListMenuModule } from './list_menu/list_menu.module';
import { RoleModule } from './role/role.module';
import { ClientModule } from './client/client.module';
import { FeatureModule } from './feature/feature.module';
import { PackageFeatureModule } from './package_feature/package_feature.module';
import { ElementModule } from './element/element.module';
import { CustomTemplateModule } from './custom-template/custom-template.module';

@Module({
  imports: [PackageModule, ThrottlerModule.forRoot([{ ttl: 5, limit: 10 }]), BankModule, ListMenuModule, RoleModule, ClientModule, FeatureModule, PackageFeatureModule, ElementModule, CustomTemplateModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})
export class CmsAdminModule {}
