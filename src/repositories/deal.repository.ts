import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Deal, DealRelations} from '../models';

export class DealRepository extends DefaultCrudRepository<
  Deal,
  typeof Deal.prototype.id,
  DealRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Deal, dataSource);
  }
}
