import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from '../../database/repository/database.repository';
import { UserEntity } from '../schema/user.entity';
import { UserDocument } from '../schema/user.schema';

@Injectable()
export class UserRepository extends AbstractRepository<UserDocument> {
  protected readonly logger = new Logger(UserRepository.name);

  constructor(@InjectModel(UserEntity.name) userModel: Model<UserDocument>) {
    super(userModel);
  }
}
