import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { findAllUsersReturn, UsersService } from './users.service';
// import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  @Get('/getAllUsers/')
  findAllUsers(): Promise<findAllUsersReturn[]> {
    return this.usersService.findAllUsers();
  }

  @Get('/getUnValidatedUsers')
  findAllUnValidatedUsers(): Promise<findAllUsersReturn[]> {
    return this.usersService.findAllUnValidatedUsers();
  }

  @Get('/getUser/:id')
  findOneUser(@Param('id') id: string): Promise<findAllUsersReturn> {
    return this.usersService.findOneUser(+id);
  }

  @Patch('/updateUser/:id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(+id, updateUserDto);
  }

  @Delete('/deleteUser/:id')
  removeUser(@Param('id') id: string): Promise<{ id: number }> {
    return this.usersService.removeUser(+id);
  }
}
