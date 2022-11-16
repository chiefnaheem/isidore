import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerResolver } from './resolver/customer.resolver';
import { CustomerEntity, CustomerSchema } from './schema/customer.schema';
import { CustomerService } from './service/customer.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CustomerEntity.name, schema: CustomerSchema },
    ]),
  ],
  providers: [CustomerResolver, CustomerService],
})
export class CustomerModule {}
