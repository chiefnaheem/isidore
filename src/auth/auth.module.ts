import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthResolver } from './resolver/auth.resolver';
import { AuthService } from './service/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    UserModule,
    // JwtModule.registerAsync({
    //   useFactory: (configService: ConfigService) => ({
    //      secret: configService.get<string>('JWT_SECRET'),
    //      signOptions: {
    //        expiresIn: `${configService.get('JWT_EXPIRATION')}s`,
    //      },
    //    }),
    //    inject: [ConfigService],
    //  }),
     JwtModule.register({}),
  ],

  providers: [AuthService, LocalStrategy, JwtStrategy, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
