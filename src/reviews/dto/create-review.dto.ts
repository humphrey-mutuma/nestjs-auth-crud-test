// create-review.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto implements Prisma.ReviewCreateInput {
  @ApiProperty({ example: 'Nice Product' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Look goos ...' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ example: 4 })
  @IsInt()
  @Min(1, { message: 'Rating must be at least 1' })
  @Max(5, { message: 'Rating cannot be more than 5' })
  rating: number;

  @ApiProperty({ example: 0 })
  @IsInt()
  @IsNotEmpty()
  productId: number;

  @ApiProperty({ example: 0 })
  @IsInt()
  @IsNotEmpty()
  authorId: number;

  product: Prisma.ProductCreateNestedOneWithoutReviewsInput;
  author: Prisma.UserCreateNestedOneWithoutReviewsInput;
}
