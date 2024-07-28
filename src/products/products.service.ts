import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: DatabaseService) {}

  async create(createProductDto: Prisma.ProductCreateInput) {
    return this.prismaService.product.create({ data: createProductDto });
  }

  async findAll() {
    return await this.prismaService.product.findMany({
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
    return this.prismaService.product.findUnique({
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
    return this.prismaService.product.update({
      where: { id: id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    return this.prismaService.product.delete({ where: { id } });
  }
}
