import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  // IsOptional,
  IsNotEmpty,
  IsBoolean,
  Length,
} from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({ example: 'john doe' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    example: 'password123',
    minLength: 6,
  })
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;

  @ApiProperty({ example: 25 })
  @IsInt({ message: 'Age must be a number' })
  @IsNotEmpty({ message: 'age is required' })
  age: number;

  // @ApiProperty({
  //   example: 'optional-access-token',
  //   description: 'The access token of the user',
  //   required: false,
  // })
  // @IsString()
  // @IsOptional()
  // accessToken?: string;
}

export class UpdateValidationStatusDto {
  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  isValidated: boolean;
}

export class LoginAuthDto {
  @ApiProperty({ example: 'john doe' })
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
