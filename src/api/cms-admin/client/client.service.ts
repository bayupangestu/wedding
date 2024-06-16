import { AuthHelper } from '@/api/auth/auth.helper';
import { AuthService } from '@/api/auth/auth.service';
import { User } from '@/migrations/user.entity';
import { BrideInfo } from '@/migrations/bride_info.entity';
import { GroomInfo } from '@/migrations/groom_info.entity';
import { MarriageReception } from '@/migrations/marriage_reception.entity';
import { MarriageContract } from '@/migrations/marriage_contract.entity';
import { Asset } from '@/migrations/asset.entity';
import { Bank } from '@/migrations/bank.entity';
import { Package } from '@/migrations/package.entity';
import { UserPackageTemplate } from '@/migrations/user_package_template.entity';
import { LoveStoryContent } from '@/migrations/love_story_content.entity';
import { Music } from '@/migrations/music.entity';
import { Prayer } from '@/migrations/prayer.entity';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadHelper } from '@/common/helper/upload.helper';
import { UserBank } from '@/migrations/user_bank.entity';

@Injectable()
export class ClientService {
  @InjectRepository(User)
  private userRepository: Repository<User>;

  @InjectRepository(Bank)
  private bankRepository: Repository<Bank>;

  @InjectRepository(Package)
  private packageRepository: Repository<Package>;

  @Inject(AuthHelper)
  private authHelper: AuthHelper;

  @Inject(UploadHelper)
  private uploadHelper: UploadHelper;

  public async create(data: any, files: any): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {
        email: data.email.toLowerCase()
      }
    });
    if (!user) {
      throw new HttpException('User not found', 400);
    }
    const packageData = await this.packageRepository.findOne({
      where: {
        id: data.package_id
      }
    });
    if (!packageData) {
      throw new HttpException('Package not found', 400);
    }
    const queryRunner =
      this.userRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // user package template
      const userPackageTemplate = new UserPackageTemplate();
      userPackageTemplate.user = user;
      userPackageTemplate.packages = packageData;
      await queryRunner.manager.save(UserPackageTemplate, userPackageTemplate);

      // groom info
      const groomInfo = new GroomInfo();
      groomInfo.user = user;
      groomInfo.full_name = data.groom_info.full_name;
      groomInfo.social_media = data.groom_info.social_media;
      groomInfo.groom_address = data.groom_info.groom_address;
      groomInfo.groom_parents = data.groom_info.groom_parents;
      await queryRunner.manager.save(GroomInfo, groomInfo);

      // bride info
      const brideInfo = new BrideInfo();
      brideInfo.user = user;
      brideInfo.full_name = data.bride_info.full_name;
      brideInfo.social_media = data.bride_info.social_media;
      brideInfo.bride_address = data.bride_info.bride_address;
      brideInfo.bride_parents = data.bride_info.bride_parents;
      await queryRunner.manager.save(BrideInfo, brideInfo);

      // marriage reception
      const marriageReception = new MarriageReception();
      marriageReception.user = user;
      marriageReception.venue = data.marriage_reception.venue;
      marriageReception.date = new Date(data.marriage_reception.date);
      marriageReception.address = data.marriage_reception.address;
      marriageReception.long = data.marriage_reception.long;
      marriageReception.lat = data.marriage_reception.lat;
      await queryRunner.manager.save(MarriageReception, marriageReception);

      // marriage contract
      const marriageContract = new MarriageContract();
      marriageContract.user = user;
      marriageContract.venue = data.marriage_contract.venue;
      marriageContract.date = data.marriage_contract.date;
      marriageContract.address = data.marriage_contract.address;
      marriageContract.long = data.marriage_contract.long;
      marriageContract.lat = data.marriage_contract.lat;
      await queryRunner.manager.save(MarriageContract, marriageContract);

      // user bank
      const userBankPromise = data.user_bank.map(async (item: any) => {
        const bank = await this.bankRepository.findOne({
          where: {
            id: item.bank_id
          }
        });
        if (!bank) {
          throw new HttpException('Bank not found', 400);
        }
        const userBank = new UserBank();
        userBank.user = user;
        userBank.bank = bank;
        userBank.account_number = item.account_number;
        userBank.account_name = item.account_name;
        await queryRunner.manager.save(UserBank, userBank);
        return 'success';
      });
      await Promise.all(userBankPromise);

      // love story content
      const loveStoryContent = new LoveStoryContent();
      loveStoryContent.user = user;
      loveStoryContent.first_meet = data.love_story_content.first_meet;
      loveStoryContent.relationship = data.love_story_content.relationship;
      loveStoryContent.engagement = data.love_story_content.engagement;
      loveStoryContent.married = data.love_story_content.married;
      loveStoryContent.quotes = data.love_story_content.quotes;
      loveStoryContent.first_meet_date = new Date(
        data.love_story_content.first_meet_date
      );
      loveStoryContent.relationship_date = new Date(
        data.love_story_content.relationship_date
      );
      loveStoryContent.engagement_date = new Date(
        data.love_story_content.engagement_date
      );
      loveStoryContent.married_date = new Date(
        data.love_story_content.married_date
      );
      await queryRunner.manager.save(LoveStoryContent, loveStoryContent);

      // prayer
      const prayer = new Prayer();
      prayer.user = user;
      prayer.description = data.prayer.description;
      prayer.type = data.prayer.type;
      await queryRunner.manager.save(Prayer, prayer);

      // asset
      let idx = 0;
      if (!files) {
        throw new HttpException('Files not found', 400);
      }
      const temp = []; // Initialize temp array to store results
      const assetPromise = Object.keys(files).map(async (key) => {
        const asset = files[key];
        if (asset) {
          const assetData = await Promise.all(
            asset.map(async (item: any) => {
              try {
                if (key !== 'music') {
                  const assetFile = await this.uploadHelper.uploadFile(item);
                  const asset = new Asset();
                  asset.user = user;
                  asset.name = key;
                  asset.asset = assetFile;
                  const result = await queryRunner.manager.save(Asset, asset);
                  temp.push(result);
                } else if (key === 'music') {
                  const music = new Music();
                  // music.user = user;
                  const musicFile = await this.uploadHelper.uploadFile(item);
                  music.name = musicFile;
                  const result = await queryRunner.manager.save(Music, music);
                  temp.push(result);
                } else {
                  throw new HttpException('Invalid key', 400);
                }
                return 'success';
              } catch (error) {
                // Handle any errors
                console.error('Error processing asset:', error);
                return 'error';
              }
            })
          );
          temp.push(assetData);
        }
      });
      await Promise.all(assetPromise);
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return 'success';
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      return error;
    }
  }

  public async findAll(req: any): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {
        email: req.user.email
      }
    });
    if (!user) {
      throw new HttpException('User not found', 400);
    }
  }
}
