import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsEnum,
} from 'class-validator';

enum Availibility {
  IN_STORE = 'IN_STORE',
  ONLINE = 'ONLINE',
}

export class CreateProductDto {
  @ApiProperty({ example: 'Product A', description: 'The name of the product' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 99.99, description: 'The price of the product' })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: true,
    description: 'Is the product on sale?',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  sale?: boolean;

  @ApiProperty({
    example: 'IN_STORE',
    description: 'The availability of the product',
    enum: Availibility,
  })
  @IsEnum(Availibility)
  @IsNotEmpty()
  availibility: Availibility;

  @ApiProperty({
    example: 'This is a product description',
    description: 'The description of the product',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
