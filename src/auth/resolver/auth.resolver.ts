import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginDto } from 'src/user/dto/user.dto';
import { UserEntity } from 'src/user/schema/user.entity';
import { AuthService } from '../service/auth.service';

@Resolver(() => UserEntity)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // //login mutation resolver
  // @Mutation(() => UserEntity)
  // async login(@Args('login') body: LoginDto) {
  //   return this.usersService.login(body);
  // }

  //login mutation resolver
    @Mutation(() => UserEntity)
    async login(@Args('login') body: LoginDto) {
        return this.authService.login(body);
        }

  
}
