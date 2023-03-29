import {Entity, model, property} from '@loopback/repository';

@model()
export class StoreModel extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'boolean',
    required: true,
  })
  isActive: boolean;

  @property({
    type: 'string',
    required: true,
  })
  logo: string;


  constructor(data?: Partial<StoreModel>) {
    super(data);
  }
}

export interface StoreModelRelations {
  // describe navigational properties here
}

export interface CheapSharkStore {
  storeName:string;
  isActive:boolean;
  images : {
    logo:string,
  }
}

export type StoreModelWithRelations = StoreModel & StoreModelRelations;
