import {Entity, model, property} from '@loopback/repository';
import {GameDeals} from "./deal.model";

@model()
export class Game extends Entity {
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
  gameID: string;

  @property({
    type: 'string',
  })
  steamAppID?: string;

  @property({
    type: 'string',
    required: true,
  })
  cheapest: string;

  @property({
    type: 'string',
    required: true,
  })
  cheapestDealID: string;

  @property({
    type: 'string',
    required: true,
  })
  external: string;

  @property({
    type: 'string',
    required: true,
  })
  thumb: string;


  constructor(data?: Partial<Game>) {
    super(data);
  }
}

export interface GameRelations {
  // describe navigational properties here
}

export interface CheapSharkGame{
  gameID:string;
  steamAppID:string;
  cheapest:string;
  cheapestDealID:string;
  external:string;
  thumb:string;
}

export interface GameLookup{
  info:{
    title:string;
    steamAppID:string;
    thumb:string;
  },
  cheapestPriceEver:{
    price:string;
    date:any;
  },
  deals:GameDeals[]
}

export type GameWithRelations = Game & GameRelations;
