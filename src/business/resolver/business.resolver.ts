import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { GqlAuthGuard } from 'src/auth/guards/gql.auth.guard';
import JwtAuthGuard from 'src/auth/guards/jwt.auth.guard';
import { GetCurrentUser } from 'src/user/dto/getUser.dto';
import { UpdateBusinessDto, CreateBusinessDto } from '../dto/business.dto';
import { BusinessEntity } from '../schema/business.schema';
import { BusinessService } from '../service/business.service';

@Resolver(() => BusinessEntity)
// @UseGuards(JwtAuthGuard)
export class BusinessResolver {
  constructor(private readonly businessService: BusinessService) {}

//   @UseGuards(GqlAuthGuard)
  @Mutation(() => BusinessEntity)
  async createBusiness(
    @Args('createBusiness') body: CreateBusinessDto,
   
  ) {
    return this.businessService.createBusiness(body);
  }

   //get all businesses


    // @UseGuards(GqlAuthGuard)
    @Query(() => BusinessEntity, { name: 'business' })
    async getBusiness(
        @Args('id') id: string,

    ) {
        return this.businessService.getBusiness(id);
        }

    // @UseGuards(GqlAuthGuard)
    @Mutation(() => BusinessEntity)
    async updateBusiness(
        @Args('id') id: string,
        @Args('updateBusiness') body: UpdateBusinessDto,
       
    ) {
        return this.businessService.updateBusiness(id, body);
        }

    // @UseGuards(GqlAuthGuard)
    @Mutation(() => BusinessEntity)
    async deleteBusiness(
        @Args('id') id: string,

    ) {
        return this.businessService.deleteBusiness(id);
        }
}
