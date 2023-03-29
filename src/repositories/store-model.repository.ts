import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {StoreModel, StoreModelRelations} from '../models';

export class StoreModelRepository extends DefaultCrudRepository<
  StoreModel,
  typeof StoreModel.prototype.id,
  StoreModelRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(StoreModel, dataSource);
  }
}
