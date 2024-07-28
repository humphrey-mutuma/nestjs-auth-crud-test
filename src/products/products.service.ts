import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createProductDto: Prisma.ProductCreateInput) {
    return this.databaseService.product.create({ data: createProductDto });
  }

  async findAll() {
    return await this.databaseService.product.findMany({
      include: {
        tags: true,
        reviews: true,
        _count: {
          select: {
            tags: true,
            reviews: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return this.databaseService.product.findUnique({
      where: { id },
      include: {
        tags: true,
        reviews: true,
        _count: {
          select: {
            reviews: true,
            tags: true,
          },
        },
      },
    });
  }

  async update(id: number, updateProductDto: Prisma.ProductUpdateInput) {
    return this.databaseService.product.update({
      where: { id: id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.product.delete({ where: { id } });
  }
}
