import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { GetCurrentUser } from '../dto/getUser.dto';
import { LoginDto, RegisterDto } from '../dto/user.dto';
import { UserEntity } from '../schema/user.entity';
import { UserDocument } from '../schema/user.schema';
import { AuthService } from 'src/auth/service/auth.service';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
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
    const user = new this.userModel(body);
    await user.save();
    return user;

    // const userDocument = await this.usersRepository.create({
    //   ...body,
    //   password: await bcrypt.hash(body.password, 10),
    // });
    // return this.toModel(userDocument);
  }

  // private async validateCreateUserData(body: RegisterDto) {
  //   try {
  //     const emailExists = await this.userModel.findOne({ email: body.email });
  //     if(emailExists) {

  //       throw new ConflictException('Email already exists. lldjdj');
  //     }

  //   } catch (err) {
  //     throw new InternalServerErrorException(err.message);
  //   }
  // }

  // private async accessToken(
  //   userId: string,
  //   email: string,
  // ): Promise<{ access_token: string }> {
  //   const secret = this.configService.get('JWT_SECRET');
  //   const token = await this.jwtService.signAsync(
  //     {
  //       sub: userId,
  //       email,
  //     },
  //     { expiresIn: '1hr', secret },
  //   );
  //   return { access_token: token };
  // }

  //we want user to be able to log in with email and password after validating the user and generate access token

  // async login(body: LoginDto) {
  //   const user = await this.validateUser(body.email, body.password);
  //   return this.accessToken(user._id, user.email);
  // }

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

  // private toModel(userDocument: UserDocument): UserEntity {
  //   return {
  //     _id: userDocument?._id.toHexString(),
  //     email: userDocument.email,
  //   };
  // }
}
