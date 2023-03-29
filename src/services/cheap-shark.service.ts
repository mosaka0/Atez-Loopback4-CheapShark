import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {CheapSharkDataSource} from '../datasources';
import {Deal, Game, GameLookup, StoreModel} from "../models";
import {Filter} from "@loopback/repository";

export interface CheapShark {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  getAllStores(): Promise<StoreModel[]>;
  getAllStoresLastChange(): Promise<StoreModel[]>;

  getListOfDeals(storeID: string,upperPrice?:string): Promise<Deal[]>;
  getDealLookup(id:string): Promise<Deal>;

  getListOfGames(url:string): Promise<Game[]>;
  getGameLookup(id:string): Promise<GameLookup>;
  getMultiGameLookup(url:string): Promise<{}>;

  getGameAlert(url:string): Promise<boolean>;
}

export class CheapSharkProvider implements Provider<CheapShark> {
  constructor(
    // CheapShark must match the name property in the datasource json file
    @inject('datasources.CheapShark')
    protected dataSource: CheapSharkDataSource = new CheapSharkDataSource(),
  ) {}


  value(): Promise<CheapShark> {
    return getService(this.dataSource);
  }
}
