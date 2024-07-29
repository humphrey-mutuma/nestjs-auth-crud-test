import { Injectable } from '@nestjs/common';
import {
  CreateAuthDto,
  UpdateValidationStatusDto,
  LoginAuthDto,
} from './dto/create-auth.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthService {
  constructor(private readonly databaseService: DatabaseService) {}

  // create new account
  async createAccount(createAuthDto: CreateAuthDto): Promise<{ id: number }> {
    const { age, password, username } = createAuthDto;
    return this.databaseService.user.create({
      data: { age, password, username },
      select: {
        id: true,
      },
    });
  }

  // login users
  async login(loginAuthDto: LoginAuthDto): Promise<{ accessToken: string }> {
    const { username, password } = loginAuthDto;
    // generate an access token after login here
    return this.databaseService.user.findUnique({
      where: {
        username,
        password,
      },
      select: {
        accessToken: true,
      },
    });
  }

  // validate a users account
  async validateAccount(
    id: number,
    UpdateValidationStatusDto: UpdateValidationStatusDto,
  ): Promise<{ isValidated: boolean }> {
    const { isValidated } = UpdateValidationStatusDto;
    return this.databaseService.user.update({
      where: {
        id,
      },
      data: {
        isValidated,
      },
      select: {
        isValidated: true,
      },
    });
  }
}
