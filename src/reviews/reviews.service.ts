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
      data: {
        title: title,
        content: content,
        rating: rating,
        product: { connect: { id: productId } },
        author: { connect: { id: authorId } },
      },
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
      include: { author: true, product: true },
    });
  }

  async update(
    id: number,
    updateReviewDto: UpdateReviewDto,
  ): Promise<{ id: number }> {
    const { content, productId, rating, title, authorId } = updateReviewDto;

    return this.prismaService.review.update({
      where: { id: id },
      data: {
        title: title,
        content: content,
        rating: rating,
        product: { connect: { id: productId } },
        author: { connect: { id: authorId } },
      },
      select: {
        id: true,
      },
    });
  }

  async remove(id: number) {
    return this.prismaService.review.delete({ where: { id } });
  }
}
