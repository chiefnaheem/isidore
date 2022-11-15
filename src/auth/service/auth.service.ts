import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
// import { UserEntity } from '../../user/schema/user.entity';

export interface TokenPayload {
  userId: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  // async login(user: UserEntity, response: Response) {
  //   const tokenPayload: TokenPayload = {
  //     userId: user._id,
  //   };

  //   const expires = new Date();
  //   expires.setSeconds(
  //     expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
  //   );

  //   const token = this.jwtService.sign(tokenPayload);

  //   response.cookie('Authentication', token, {
  //     httpOnly: true,
  //     expires,
  //   });
  // }
  async accessToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const secret = this.configService.get('JWT_SECRET');
    const token = await this.jwtService.signAsync(
      {
        sub: userId,
        email,
      },
      { expiresIn: '1hr', secret },
    );
    return { access_token: token };
  }

  logout(response: Response) {
    response.cookie('Authentication', '', {
      httpOnly: true,
      expires: new Date(),
    });
  }
}
