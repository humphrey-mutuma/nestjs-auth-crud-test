import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  // IsOptional,
  // IsBoolean,
  IsInt,
  Min,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'john_doe', description: 'The username of the user' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: '#Pas@123.wod',
    description: 'The password of the user',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  // @ApiProperty({
  //   example: 'abc123token',
  //   description: 'The access token of the user',
  //   required: false,
  // })
  // @IsString()
  // @IsOptional()
  // accessToken?: string;

  // @ApiProperty({
  //   example: false,
  //   description: 'Is the user validated?',
  //   default: false,
  // })
  // @IsBoolean()
  // @IsOptional()
  // isValidated?: boolean;

  @ApiProperty({ example: 25, description: 'The age of the user' })
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  age: number;
}
