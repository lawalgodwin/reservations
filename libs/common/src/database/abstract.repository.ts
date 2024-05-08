import { Logger, NotFoundException } from '@nestjs/common';
import { AbstractEntity } from './abstract.entity';
import { FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class AbstractRepository<T extends AbstractEntity<T>> {
  protected abstract readonly logger: Logger;
  constructor(
    // protected readonly entityManager: EntityManager,
    protected readonly entityRepository: Repository<T>,
  ) {}
  async create(entity: T): Promise<T> {
    return this.entityRepository.save(entity);
  }
  async findOne(
    where: FindOptionsWhere<T>,
    relations?: FindOptionsRelations<T>,
  ): Promise<T> {
    const result = await this.entityRepository.findOne({ where, relations });
    if (!result) {
      this.logger.warn(`Document not found with where: ${where}`);
      throw new NotFoundException('Entity not found');
    }
    return result;
  }
  async findOneAndUpdate(
    where: FindOptionsWhere<T>,
    partitalEntity: QueryDeepPartialEntity<T>,
  ) {
    const updatedResult = await this.entityRepository.update(
      where,
      partitalEntity,
    );
    if (!updatedResult.affected) {
      this.logger.warn('Entity not found with where ' + where);
      throw new NotFoundException('Entity not found');
    }
    return this.findOne(where);
  }
  async find(where: FindOptionsWhere<T>) {
    return this.entityRepository.findBy(where);
  }

  async findOneAndDelete(where: FindOptionsWhere<T>) {
    await this.entityRepository.delete(where);
  }
}
