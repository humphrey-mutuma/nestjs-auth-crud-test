import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CreateAuthDto,
  UpdateValidationStatusDto,
  LoginAuthDto,
} from './dto/create-auth.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/createAccount')
  createAccount(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.createAccount(createAuthDto);
  }

  @Get('/login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Patch('/validateAccount/:id')
  validateAccount(
    @Param('id') id: string,
    @Body() UpdateValidationStatusDto: UpdateValidationStatusDto,
  ) {
    return this.authService.validateAccount(+id, UpdateValidationStatusDto);
  }
}
