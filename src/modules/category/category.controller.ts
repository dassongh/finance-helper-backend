import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';

import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

import { GetUserId } from '../auth/decorator';
import { AuthGuard } from '../auth/guard';

import { GetPagination } from '../../common/decorator';
import { FindOneParams } from '../../common/dto';
import { Pagination } from '../../common/interfaces';

@UseGuards(AuthGuard)
@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('/')
  public async create(@GetUserId() userId: number, @Body() dto: CreateCategoryDto) {
    const category = await this.categoryService.create(userId, dto);
    return { data: category };
  }

  @Get('/')
  public async get(@GetUserId() userId: number, @GetPagination() pagination: Pagination) {
    const { categories, count } = await this.categoryService.get(userId, pagination);
    return { data: categories, count };
  }

  @Get('/:id')
  public async getById(@GetUserId() userId: number, @Param() { id }: FindOneParams) {
    const category = await this.categoryService.getById(userId, id);
    return { data: category };
  }

  @Put('/:id')
  public async update(@GetUserId() userId: number, @Param() { id }: FindOneParams, @Body() dto: UpdateCategoryDto) {
    const category = await this.categoryService.update(userId, id, dto);
    return { data: category };
  }

  @Delete('/:id')
  public async delete(@GetUserId() userId: number, @Param() { id }: FindOneParams) {
    await this.categoryService.delete(userId, id);
    return { status: 'ok' };
  }
}
