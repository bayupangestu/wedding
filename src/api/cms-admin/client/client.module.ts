import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@/api/auth/auth.module';
import { User } from '@/migrations/user.entity';
import { BrideInfo } from '@/migrations/bride_info.entity';
import { GroomInfo } from '@/migrations/groom_info.entity';
import { MarriageReception } from '@/migrations/marriage_reception.entity';
import { MarriageContract } from '@/migrations/marriage_contract.entity';
import { UserPackageTemplate } from '@/migrations/user_package_template.entity';
import { AuthService } from '@/api/auth/auth.service';
import { Role } from '@/migrations/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      BrideInfo,
      GroomInfo,
      MarriageReception,
      MarriageContract,
      UserPackageTemplate,
      Role
    ]),
    AuthModule
  ],
  controllers: [ClientController],
  providers: [ClientService, AuthService]
})
export class ClientModule {}
