import { UsersService } from './users.service';
import { Controller, Get,Post , Req , Param, Body, Delete, Patch} from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './interfaces/user-interface';
import { ValidateObjectIdPipe } from 'src/decorators/validate-uuid';
import { UpdateUserDto } from './dto/update-user-dto';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService){}

  @Post()
  create(@Body() createUserDto:CreateUserDto):Promise<User>{
    return this.usersService.createUser(createUserDto)
  }
  @Get()
  async findAll(@Req() request:Request): Promise<User[]> {
    return this.usersService.findAll();
  }
  @Patch(':id')
  findOne(@Param("id",ValidateObjectIdPipe) id: string,@Body() updateUserDto:UpdateUserDto): Promise<User> {
    return this.usersService.update(id,updateUserDto);
  }
  @Delete(':id')
  remove(@Param('id',ValidateObjectIdPipe) id: string) {
    return this.usersService.delete(id)
  }
}
