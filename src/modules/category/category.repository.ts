import { DataSource, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { Category } from './category.entity';

@Injectable()
export class CategoryRepository extends Repository<Category> {
  constructor(dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
  }
}
