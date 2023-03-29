import {Entity, model, property} from '@loopback/repository';

@model()
export class Deal extends Entity {
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
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  storeID: string;

  @property({
    type: 'string',
    required: true,
  })
  gameID: string;

  @property({
    type: 'string',
    required: true,
  })
  salePrice: string;

  @property({
    type: 'string',
    required: true,
  })
  normalPrice: string;


  constructor(data?: Partial<Deal>) {
    super(data);
  }
}

export interface DealRelations {
  // describe navigational properties here
}

export interface GameDeals {
  storeID:string;
  dealID:string;
  price:string;
  retailPrice:string;
  savings:string;
}

export type DealWithRelations = Deal & DealRelations;
