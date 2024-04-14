import { PackageFeature } from '@/migrations/package_feature.entity';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreatePackageFeatureDto,
  UpdatePackageFeatureDto
} from './package_feature.dto';
import { ILike } from 'typeorm';
import { Package } from '@/migrations/package.entity';

@Injectable()
export class PackageFeatureService {
  @InjectRepository(PackageFeature)
  private readonly packageFeatureRepository: Repository<PackageFeature>;

  @InjectRepository(Package)
  private readonly packageRepository: Repository<Package>;

  public async create(data: CreatePackageFeatureDto): Promise<any> {
    const packages = await this.packageRepository.findOne({
      where: {
        id: data.package_id
      }
    });
    if (!packages) {
      throw new HttpException('Package not found', 404);
    }
    const packageFeature = data.feature.map(async (feature) => {
      const newPackageFeature = new PackageFeature();
      newPackageFeature.package = packages.id;
      newPackageFeature.feature = feature;
      await this.packageFeatureRepository.save(newPackageFeature);
      return 'success';
    });
    await Promise.all(packageFeature);
    return {
      statusCode: 201,
      message: 'Package feature created successfully'
    };
  }

  public async findAll(): Promise<any> {
    const result = await this.packageFeatureRepository.find({
      relations: {
        package: true,
        feature: true
      }
    });
    let groupedData = result.reduce((acc, item) => {
      // Check if package already exists in accumulator
      let existingPackage = acc.find((p) => p.package === item.package.name);
      if (existingPackage) {
        // If package exists, add feature to its features array
        existingPackage.features.push({ name: item.feature.name });
      } else {
        // If package doesn't exist, create a new package object
        acc.push({
          package: item.package.name,
          features: [{ name: item.feature.name }]
        });
      }
      return acc;
    }, []);
    return {
      statusCode: 200,
      result: groupedData
    };
  }

  public async findOne(query: any): Promise<any> {
    const result = await this.packageFeatureRepository.find({
      relations: {
        package: true,
        feature: true
      },
      where: {
        package: {
          name: query.package_name
        }
      }
    });
    if (!result) {
      throw new HttpException('Package feature not found', 404);
    }
    // Group the data by package
    let groupedData = result.reduce((acc, item) => {
      // Check if package already exists in accumulator
      let existingPackage = acc.find((p) => p.package === item.package.name);
      if (existingPackage) {
        // If package exists, add feature to its features array
        existingPackage.features.push({ name: item.feature.name });
      } else {
        // If package doesn't exist, create a new package object
        acc.push({
          package: item.package.name,
          features: [{ name: item.feature.name }]
        });
      }
      return acc;
    }, []);
    return {
      statusCode: 200,
      result: groupedData
    };
  }

  public async update(id: number, data: UpdatePackageFeatureDto): Promise<any> {
    const packages = await this.packageFeatureRepository.find({
      relations: {
        feature: true,
        package: true
      },
      where: {
        package: {
          id
        }
      }
    });
    if (!packages) {
      throw new HttpException('Package not found', 404);
    }
    await this.packageFeatureRepository.softDelete({
      package: {
        id
      }
    });
    const packageFeature = data.feature.map(async (feature) => {
      const newPackageFeature = new PackageFeature();
      newPackageFeature.package = id;
      newPackageFeature.feature = feature;
      return 'success';
    });
    await Promise.all(packageFeature);
    return {
      statusCode: 200,
      message: 'Package feature updated successfully'
    };
  }

  public async delete(id: number): Promise<any> {
    const result = await this.packageFeatureRepository.findOne({
      where: {
        id
      }
    });
    if (!result) {
      throw new HttpException('Package feature not found', 404);
    }
    await this.packageFeatureRepository.softDelete({
      id
    });
    return {
      statusCode: 200,
      message: 'Package feature deleted successfully'
    };
  }
}
