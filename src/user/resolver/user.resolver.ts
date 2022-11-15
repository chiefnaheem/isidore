import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../../auth/guards/gql.auth.guard';
import { GetCurrentUser } from '../dto/getUser.dto';
import { RegisterDto } from '../dto/user.dto';
import { UserEntity } from '../schema/user.entity';
import { UserService } from '../service/user.service';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly usersService: UserService) {}

  @Mutation(() => UserEntity)
  async createUser(@Args('createUserData') body: RegisterDto) {
    return this.usersService.createUser(body);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => UserEntity, { name: 'user' })
  async getUser(@Args() getCurrentUser: GetCurrentUser) {
    return this.usersService.getUser(getCurrentUser);
  }
}
