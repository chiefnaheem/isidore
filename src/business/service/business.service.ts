import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { GetCurrentUser } from 'src/user/dto/getUser.dto';
import { BusinessDocument, BusinessEntity } from '../schema/business.schema';

import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBusinessDto, UpdateBusinessDto } from '../dto/business.dto';

@Injectable()
export class BusinessService {
  constructor(
    @InjectModel(BusinessEntity.name)
    private userModel: Model<BusinessDocument>,
  ) {}

  //we want to create business in which the owner will be the logged in user

  async createBusiness(body: CreateBusinessDto, currentUser: GetCurrentUser) {
    //we want to create business in which the owner will be the logged in user
    try {
      const business = new this.userModel({
        ...body,
        owner: currentUser._id,
      });
      await business.save();
      return business;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  //we want to get all businesses in which the owner will be the logged in user
  async getBusinesses(currentUser: GetCurrentUser) {
    try {
      const businessDocument = await this.userModel.find({
        owner: currentUser._id,
      });
      return businessDocument;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  //we want to get a business in which the owner will be the logged in user
  async getBusiness(id: string, currentUser: GetCurrentUser) {
    try {
      const businessDocument = await this.userModel.findOne({
        _id: id,
        owner: currentUser._id,
      });
      return businessDocument;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  //we want to update a business in which the owner will be the logged in user
  async updateBusiness(
    id: string,
    body: UpdateBusinessDto,
    currentUser: GetCurrentUser,
  ) {
    try {
      const businessDocument = await this.userModel.findOne({
        _id: id,
        owner: currentUser._id,
      });
      if (!businessDocument) {
        throw new NotFoundException('Business not found');
      }
      businessDocument.set(body);
      await businessDocument.save();
      return businessDocument;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  //we want to delete a business in which the owner will be the logged in user
  async deleteBusiness(id: string, currentUser: GetCurrentUser) {
    try {
      const businessDocument = await this.userModel.findOne({
        _id: id,
        owner: currentUser._id,
      });
      if (!businessDocument) {
        throw new NotFoundException('Business not found');
      }
      await businessDocument.remove();
      return `successfully deleted`;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
