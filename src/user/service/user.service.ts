import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { GetCurrentUser } from '../dto/getUser.dto';
import { RegisterDto } from '../dto/user.dto';
import { UserEntity } from '../schema/user.entity';
import { UserDocument } from '../schema/user.schema';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UserRepository) {}

  async createUser(body: RegisterDto) {
    await this.validateCreateUserData(body);
    const userDocument = await this.usersRepository.create({
      ...body,
      password: await bcrypt.hash(body.password, 10),
    });
    return this.toModel(userDocument);
  }

  private async validateCreateUserData(body: RegisterDto) {
    try {
      await this.usersRepository.findOne({ email: body.email });
      throw new ConflictException('Email already exists.');
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async getUser(currentUser: GetCurrentUser) {
    const userDocument = await this.usersRepository.findOne(currentUser);
    return this.toModel(userDocument);
  }

  async validateUser(email: string, password: string) {
    const userDocument = await this.usersRepository.findOne({ email });
    const passwordIsValid = await bcrypt.compare(
      password,
      userDocument.password,
    );
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    return this.toModel(userDocument);
  }

  private toModel(userDocument: UserDocument): UserEntity {
    return {
      _id: userDocument._id.toHexString(),
      email: userDocument.email,
    };
  }
}
