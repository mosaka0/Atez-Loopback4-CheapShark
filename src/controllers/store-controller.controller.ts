import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {CheapSharkStore, StoreModel} from '../models';
import {StoreModelRepository} from '../repositories';
import {inject} from "@loopback/core";
import {CheapShark} from "../services";

export class StoreControllerController {
  constructor(
    @repository(StoreModelRepository)
    public storeModelRepository : StoreModelRepository,
    @inject('services.CheapShark')
    protected cheapShark: CheapShark
  ) {}

  // Stores Info
  @get('/stores/info')
  async crawl(){
    const storeResult = await this.cheapShark.getAllStores();
    // @ts-ignore
    storeResult.forEach(async (storeItem :CheapSharkStore ) => {
      const storeObject = new StoreModel();
      storeObject.name = storeItem.storeName;
      storeObject.isActive = storeItem.isActive;
      storeObject.logo = `https://www.cheapshark.com/${storeItem.images.logo}`;
      await this.storeModelRepository.create(storeObject);
    })
    return `Tüm magazalar dbde yaratıldı.`;
  }

  // Stores Last Change
  @get('/stores/lastChange')
  async lastChange(){
    return await this.cheapShark.getAllStoresLastChange();
  }






}
