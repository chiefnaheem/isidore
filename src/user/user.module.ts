import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity } from './schema/user.entity';
import { UserSchema } from './schema/user.schema';
import { UserResolver } from './resolver/user.resolver';
import { UserService } from './service/user.service';
// import { AuthModule } from 'src/auth/auth.module';

@Module({
  // imports: [
  //   JwtModule.register({}),
  //   MongooseModule.forFeatureAsync([
  //     {
  //       name: UserEntity.name,
  //       useFactory: () => {
  //         return UserSchema;
  //       },
  //     },
  //   ]),
  // ],
  imports: [
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
  ],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
