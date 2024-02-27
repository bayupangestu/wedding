import { Module } from '@nestjs/common';
import { BankController } from './bank.controller';
import { BankService } from './bank.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bank } from '@/migrations/bank.entity';
import { AuthModule } from '@/api/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Bank]), AuthModule],
  controllers: [BankController],
  providers: [BankService]
})
export class BankModule {}
