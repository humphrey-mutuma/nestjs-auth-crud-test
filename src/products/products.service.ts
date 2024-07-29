import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createProductDto: CreateProductDto) {
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

  async update(id: number, updateProductDto: UpdateProductDto) {
    return this.databaseService.product.update({
      where: { id: id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.product.delete({ where: { id } });
  }
}
