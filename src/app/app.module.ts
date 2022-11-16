import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { configValidation } from '../config/validator/config.validator';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from 'src/database/database.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { BusinessModule } from 'src/business/business.module';

@Module({
  imports: [
    DatabaseModule,
    BusinessModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: false,
      validationSchema: configValidation,
      envFilePath: ['.env'],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
