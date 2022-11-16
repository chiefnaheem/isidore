import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateCustomerDto, UpdateCustomerDto } from '../dto/customer.dto';
import { CustomerEntity } from '../schema/customer.schema';
import { CustomerService } from '../service/customer.service';

@Resolver(() => CustomerEntity)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  
  @Mutation(() => CustomerEntity)
  async createCustomer(@Args('createCustomer') body: CreateCustomerDto) {
    return this.customerService.createCustomer(body);
  }

  
  @Query(() => CustomerEntity, { name: 'customers' })
    async getCustomers() {
    return this.customerService.getCustomers();
    }


  @Query(() => CustomerEntity, { name: 'customer' })
  async getCustomer(@Args('id') id: string) {
    return this.customerService.getCustomer(id);
  }

  
  @Mutation(() => CustomerEntity)
  async updateCustomer(
    @Args('id') id: string,
    @Args('updateCustomer') body: UpdateCustomerDto,
  ) {
    return this.customerService.updateCustomer(id, body);
  }

  
  @Mutation(() => CustomerEntity)
  async deleteCustomer(@Args('id') id: string) {
    return this.customerService.deleteCustomer(id);
  }
}
