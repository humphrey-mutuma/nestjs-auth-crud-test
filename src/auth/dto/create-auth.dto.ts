import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  IsOptional,
  MinLength,
  IsNotEmpty,
  IsBoolean,
} from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({ example: 'john_doe', description: 'The username of the user' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
    minLength: 6,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 25, description: 'The age of the user' })
  @IsInt()
  @IsNotEmpty()
  age: number;

  @ApiProperty({
    example: 'optional-access-token',
    description: 'The access token of the user',
    required: false,
  })
  @IsString()
  @IsOptional()
  accessToken?: string;
}
export class UpdateValidationStatusDto {
  @ApiProperty({
    example: true,
    description: 'The validation status of the user',
  })
  @IsBoolean()
  @IsNotEmpty()
  isValidated: boolean;
}

export class LoginAuthDto {
  @ApiProperty({ example: 'john_doe', description: 'The username of the user' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
