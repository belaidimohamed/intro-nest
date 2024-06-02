import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './interfaces/user-interface';
import { CreateUserDto } from './dto/create-user-dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { tryToCatch } from 'src/utils/try-to-catch';
import { UpdateUserDto } from './dto/update-user-dto';

@Injectable()
export class UsersService { 
    constructor(@InjectModel('User') private readonly userModel:Model<User> ){}
    private readonly users: User[] = [];
    
    async createUser(user_data:CreateUserDto):Promise<User> {
        /** 
         * Instead of using a separate findOne call to check for duplicates,
         * we handle duplicate key errors directly within this method to reduce the number of database calls to one.
        */
        const [error,data] = await  tryToCatch(async ()=> {
            const created_user =  new this.userModel(user_data)
            return created_user.save()
        })
        if (error) {
            if (error.code === 11000) { // Duplicate key error
                const field = Object.keys(error.keyPattern)[0];
                throw new HttpException(`${field} already exists`,HttpStatus.BAD_REQUEST);
            }
            throw new HttpException(`Unexpected error happend while creating user:${error}`,HttpStatus.BAD_REQUEST);
          } else return data;
    }

    async findAll():Promise<User[]> {
        return this.userModel.find().exec();
    }
    async findOne(id: string): Promise<User> {
        return this.userModel.findById(id).exec();
      }
    
    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    }

    async delete(id: string): Promise<any> {
        return this.userModel.findOneAndDelete({ _id: id }).exec();
    }
}
