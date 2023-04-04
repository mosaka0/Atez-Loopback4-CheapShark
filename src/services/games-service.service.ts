import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {CheapSharkDataSource} from '../datasources';
import {Game, GameLookup} from "../models";

export interface GamesService {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  getListOfGames(title?:string,steamAppID?:string): Promise<Game[]>;
  getGameLookup(id:string): Promise<GameLookup>;
  getMultiGameLookup(url:string): Promise<{}>;
  getGameAlert(url:string): Promise<boolean>;
}

export class GamesServiceProvider implements Provider<GamesService> {
  constructor(
    // CheapShark must match the name property in the datasource json file
    @inject('datasources.CheapShark')
    protected dataSource: CheapSharkDataSource = new CheapSharkDataSource(),
  ) {}

  value(): Promise<GamesService> {
    return getService(this.dataSource);
  }
}
