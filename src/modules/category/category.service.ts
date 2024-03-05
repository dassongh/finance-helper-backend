import { Injectable } from '@nestjs/common';

import { CategoryRepository } from './category.repository';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

import { Pagination } from '../../common/interfaces';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  public async create(userId: number, dto: CreateCategoryDto) {
    const payload = { ...dto, userId };
    const category = await this.categoryRepository.save(payload);
    return category;
  }

  public async get(userId: number, { page, limit }: Pagination) {
    const offset = limit * (page - 1);
    const { 0: categories, 1: count } = await this.categoryRepository.findAndCount({
      where: { userId },
      take: limit,
      skip: offset,
    });

    return { categories, count };
  }

  public async getById(userId: number, categoryId: number) {
    const category = await this.categoryRepository.findOne({ where: { id: categoryId, userId } });
    return category;
  }

  public async update(userId: number, categoryId: number, dto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOneOrFail({ where: { id: categoryId, userId } });

    const payload = { ...category, ...dto };
    const categoryUpdated = await this.categoryRepository.save(payload);

    return categoryUpdated;
  }

  public delete(userId: number, categoryId: number) {
    return this.categoryRepository.delete({ id: categoryId, userId });
  }
}
