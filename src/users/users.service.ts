import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';
export interface findAllUsersReturn {
  id: number;
  username: string;
  age: number;
}
@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}
  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  async findAllUsers(): Promise<findAllUsersReturn[]> {
    return this.databaseService.user.findMany({
      select: { id: true, username: true, age: true },
    });
  }

  async findAllUnValidatedUsers(): Promise<findAllUsersReturn[]> {
    return this.databaseService.user.findMany({
      where: {
        isValidated: {
          equals: false,
        },
      },
      select: { id: true, username: true, age: true },
    });
  }

  async findOneUser(id: number): Promise<findAllUsersReturn> {
    try {
      const user = await this.databaseService.user.findUnique({
        where: { id },
        select: { id: true, username: true, age: true },
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An error occurred while fetching the user',
      );
    }
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const { username, age } = updateUserDto;
    return this.databaseService.user.update({
      where: { id },
      data: { username, age },
      select: { id: true, username: true, age: true },
    });
  }

  async removeUser(id: number): Promise<{ id: number }> {
    return this.databaseService.user.delete({
      where: { id },
      select: { id: true },
    });
  }
}
