import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/service/user.service';

export interface TokenPayload {
  userId: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService
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
  private async accessToken(
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

  async login(body: LoginDto) {
    const user = await this.userService.validateUser(body.email, body.password);
    return this.accessToken(user._id, user.email);
  }
  
}
