import {
  Table,
  Model,
  PrimaryKey,
  Default,
  DataType,
  Column,
  ForeignKey,
  AllowNull,
  UpdatedAt,
  CreatedAt,
  BelongsToMany
} from 'sequelize-typescript';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from 'src/user/models/user.model';
import { NotificationUserStatus } from './notification-user-status.model';
import { NotificationTypeEnum } from '../notification.enum';
import { paginate } from 'src/_common/paginator/paginator.service';
import { IPaginateInput } from 'src/_common/paginator/paginator.interface';

@Table({
  timestamps: true,
  indexes: [{ fields: [{ name: 'senderId' }, { name: 'parentId' }, { name: 'type' }] }]
})
@ObjectType()
export class Notification extends Model<Notification> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  @Field(() => ID)
  id: string;

  @BelongsToMany(() => User, () => NotificationUserStatus)
  receivers: Array<User & { NotificationUserStatus: NotificationUserStatus }>;

  @AllowNull(true)
  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, onDelete: 'SET NULL', onUpdate: 'SET NULL' })
  senderId?: string;

  @AllowNull(true)
  @Column({ type: DataType.UUID })
  parentId?: string;

  @AllowNull(false)
  @Column
  @Field(() => NotificationTypeEnum)
  type: NotificationTypeEnum;

  @AllowNull(true)
  @Column(DataType.TEXT)
  @Field({ nullable: true })
  thumbnail?: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  @Field()
  enTitle: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  @Field()
  arTitle: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  @Field()
  enBody: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  @Field()
  arBody: string;

  @AllowNull(true)
  @Column(DataType.TEXT)
  log?: string;

  @Default(true)
  @AllowNull(false)
  @Column
  returnItToClient: boolean;

  @CreatedAt
  @Column({ type: DataType.DATE })
  createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE })
  updatedAt: Date;

  static async paginate(input: IPaginateInput) {
    return paginate<Notification>(this, input);
  }
}
