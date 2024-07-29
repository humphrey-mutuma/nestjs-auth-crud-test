import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private readonly prismaService: DatabaseService) {}

  async create(createReviewDto: CreateReviewDto): Promise<{ id: number }> {
    const { content, productId, rating, title, authorId } = createReviewDto;
    return this.prismaService.review.create({
      data: { content, productId, rating, title, authorId },
      select: {
        id: true,
      },
    });
  }

  async findAll() {
    return await this.prismaService.review.findMany({});
  }

  async findOne(id: number) {
    return this.prismaService.review.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    updateReviewDto: UpdateReviewDto,
  ): Promise<{ id: number }> {
    return this.prismaService.review.update({
      where: { id: id },
      data: updateReviewDto,
      select: {
        id: true,
      },
    });
  }

  async remove(id: number) {
    return this.prismaService.review.delete({ where: { id } });
  }
}
