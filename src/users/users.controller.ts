import { UsersService } from './users.service';
import { Controller, Get,Post , Req , Param, Body, Delete} from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from './dto/users-dto';
import { User } from './interfaces/user-interface';
import { ValidateObjectIdPipe } from 'src/decorators/validate-uuid';

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
  @Get(':id')
  findOne(@Param("id",ValidateObjectIdPipe) id: string): Promise<User> {
    return this.usersService.findOne(id);
  }
  @Delete(':id')
  remove(@Param('id',ValidateObjectIdPipe) id: string) {
    return this.usersService.delete(id)
  }
}
