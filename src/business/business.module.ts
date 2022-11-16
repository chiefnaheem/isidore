import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BusinessEntity, BusinessSchema } from './schema/business.schema';
import {BusinessResolver } from './resolver/business.resolver';
import { BusinessService } from './service/business.service';
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
    MongooseModule.forFeature([{ name: BusinessEntity.name, schema: BusinessSchema }]),
  ],
  providers: [BusinessResolver, BusinessService],
  exports: [BusinessService],
})
export class BusinessModule {}
