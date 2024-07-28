import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewDto } from './create-review.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {
  @ApiProperty({
    example: 'Great product!',
    description: 'The title of the review',
  })
  title: string;

  @ApiProperty({
    example: 'This product is amazing because...',
    description: 'The content of the review',
  })
  content: string;

  // @ApiProperty({
  //   example: 5,
  //   description: 'The rating given by the user',
  //   minimum: 1,
  //   maximum: 5,
  // })
  // rating: number;

  // @ApiProperty({
  //   example: 0,
  //   description: 'The product associated with the review',
  // })
  // productId: number;
}
