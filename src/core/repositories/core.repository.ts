import { ObjectID, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class CoreRepository<Entity> extends Repository<Entity> {
  async updateOneAndReturn(
    criteria: string | number | Date | ObjectID,
    partialEntity: QueryDeepPartialEntity<Entity>,
  ): Promise<Entity> {
    await this.update(criteria, partialEntity);
    const entity = await this.findOne(criteria);
    return entity;
  }
}
