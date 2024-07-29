import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import {
  ApiBearerAuth,
  // ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@ApiBearerAuth()
@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post('/createReview')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CreateReviewDto,
  })
  async create(
    @Body() createReviewDto: CreateReviewDto,
  ): Promise<{ id: number }> {
    return this.reviewsService.create(createReviewDto);
  }
  // ...
  @Get('/getAllReviews')
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get('/getReview/:id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
  })
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(+id);
  }

  @Patch('/updateReview/:id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: UpdateReviewDto,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<{ id: number }> {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @Delete('/deleteReview/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.reviewsService.remove(+id);
  }
}
