import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql.auth.guard';
import { GetCurrentUser } from 'src/user/dto/getUser.dto';
import { BusinessEntity } from '../schema/business.schema';
import { BusinessService } from '../service/business.service';

@Resolver(() => BusinessEntity)
export class BusinessResolver {
  constructor(private readonly businessService: BusinessService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => BusinessEntity)
  async createBusiness(
    @Args('createBusiness') body: CreateBusinessDto,
    @Args() getCurrentUser: GetCurrentUser,
  ) {
    return this.businessService.createBusiness(body, getCurrentUser);
  }

    @UseGuards(GqlAuthGuard)
    @Query(() => [BusinessEntity], { name: 'businesses' })
    async getBusinesses(@Args() getCurrentUser: GetCurrentUser) {
        return this.businessService.getBusinesses(getCurrentUser);
        }

    @UseGuards(GqlAuthGuard)
    @Query(() => BusinessEntity, { name: 'business' })
    async getBusiness(
        @Args('id') id: string,
        @Args() getCurrentUser: GetCurrentUser,
    ) {
        return this.businessService.getBusiness(id, getCurrentUser);
        }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => BusinessEntity)
    async updateBusiness(
        @Args('id') id: string,
        @Args('updateBusiness') body: UpdateBusinessDto,
        @Args() getCurrentUser: GetCurrentUser,
    ) {
        return this.businessService.updateBusiness(id, body, getCurrentUser);
        }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => BusinessEntity)
    async deleteBusiness(
        @Args('id') id: string,
        @Args() getCurrentUser: GetCurrentUser,
    ) {
        return this.businessService.deleteBusiness(id, getCurrentUser);
        }
}
