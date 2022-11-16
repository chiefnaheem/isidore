import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { GetCurrentUser } from '../dto/getUser.dto';
import { RegisterDto } from '../dto/user.dto';
import { UserEntity } from '../schema/user.entity';
import { UserDocument } from '../schema/user.schema';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(
    // private readonly usersRepository: UserRepository,
    //  private readonly configService: ConfigService,
     @InjectModel(UserEntity.name)
    private userModel: Model<UserDocument>,
   
  ) {}
    //create user
  async createUser(body: RegisterDto) {
    // await this.validateCreateUserData(body);
    const emailExists = await this.userModel.findOne({ email: body.email });
      if(emailExists) {

        throw new ConflictException('Email already exists. lldjdj');
      }
      const hashedPassword = await bcrypt.hash(body.password, 10)
      const user = new this.userModel({
        ...body,
        password: hashedPassword,
      });
    
    await user.save();
    return user;

    
    }
  async getUser(currentUser: GetCurrentUser) {
    const userDocument = await this.userModel.findOne(currentUser);
    return userDocument
  }

  async validateUser(email: string, password: string) {
    const userDocument = await this.userModel.findOne({ email });
    const passwordIsValid = await bcrypt.compare(
      password,
      userDocument.password,
    );
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    return userDocument;
  }

 
}
