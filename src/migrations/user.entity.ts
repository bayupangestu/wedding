import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne
} from 'typeorm';
import { UserPackageTemplate } from './user_package_template.entity';
import { Role } from './role.entity';
import { Asset } from './asset.entity';
import { Message } from './message.entity';
import { SpecialInvitation } from './special_invitation.entity';
import { BrideInfo } from './bride_info.entity';
import { GroomInfo } from './groom_info.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar' })
  public email!: string;

  @Exclude()
  @Column({ type: 'varchar' })
  public password!: string;

  @Column({ type: 'varchar', nullable: true })
  public name: string;

  @Column({ type: 'timestamp', nullable: true, default: null })
  public lastLoginAt: Date | null;

  @Column({ type: 'varchar', nullable: true })
  public slug: string | null;

  @Column({ type: 'varchar', nullable: true })
  public phone_number: string | null;

  @OneToMany(
    () => UserPackageTemplate,
    (user_package_template) => user_package_template.user,
    {
      cascade: true
    }
  )
  public user_package_template!: UserPackageTemplate[];

  @ManyToOne(() => Role, (role) => role.user, {
    onDelete: 'SET NULL'
  })
  @JoinColumn({ name: 'role_id' })
  public role!: Role;

  @OneToMany(() => Asset, (asset) => asset.user, {
    cascade: true
  })
  public asset!: Asset[];

  @OneToMany(() => Message, (message) => message.user, {
    cascade: true
  })
  public message!: Message[];

  @OneToMany(
    () => SpecialInvitation,
    (special_invitation) => special_invitation.user,
    {
      cascade: true
    }
  )
  public special_invitation!: SpecialInvitation[];

  @OneToOne(() => BrideInfo, (brideInfo) => brideInfo.user, {
    cascade: true
  })
  public bride_info!: BrideInfo;

  @OneToOne(() => GroomInfo, (groomInfo) => groomInfo.user, {
    cascade: true
  })
  public groom_info!: GroomInfo;

  @CreateDateColumn({ type: 'timestamp' })
  public created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updated_at!: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  public deleted_at: Date | null;
}
