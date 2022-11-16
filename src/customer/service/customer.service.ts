import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CustomerDocument, CustomerEntity } from '../schema/customer.schema';
import { CreateCustomerDto, UpdateCustomerDto } from '../dto/customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(CustomerEntity.name)
    private customerModel: Model<CustomerDocument>,
  ) {}

  //we want to create business in which the owner will be the logged in user

  async createCustomer(body: CreateCustomerDto) {
    //we want to create business in which the owner will be the logged in user
    try {
      const customer = new this.customerModel(body);
      await customer.save();
      return customer;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  //we want to get all businesses in which the owner will be the logged in user
  async getCustomers() {
    try {
      const customerDocument = await this.customerModel.find();
      return customerDocument;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  //we want to get a business in which the owner will be the logged in user
  async getCustomer(id: string) {
    try {
      const customerDocument = await this.customerModel.findById(id);
      return customerDocument;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  //we want to update a business in which the owner will be the logged in user
  async updateCustomer(id: string, body: UpdateCustomerDto) {
    try {
      const customerDocument = await this.customerModel.findByIdAndUpdate(
         id,
        body,
        {new: true}
      );
      if (!customerDocument) {
        throw new NotFoundException('Business not found');
      }
      return customerDocument;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  //we want to delete a business in which the owner will be the logged in user
  async deleteCustomer(id: string) {
    try {
      const customerDocument = await this.customerModel.findById(id);
      if (!customerDocument) {
        throw new NotFoundException('Business not found');
      }
      await customerDocument.remove();
      return `successfully deleted`;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
