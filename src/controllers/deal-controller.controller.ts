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
import {Deal} from '../models';
import {DealRepository} from '../repositories';
import {inject} from "@loopback/core";
import {CheapShark} from "../services";

export class DealControllerController {
  constructor(
    @repository(DealRepository)
    public dealRepository : DealRepository,
    @inject('services.CheapShark')
    protected cheapShark: CheapShark
  ) {}

  // List of Deals
  @get('/deals')
  async getListOfDeals(
      @param.query.string('storeID') storeID:string,
      @param.query.string('upperPrice') upperPrice:number,
  ) {
    const sendUpperPrice:string = '&upperPrice='+upperPrice;
    console.log(upperPrice);
    if(upperPrice){
      const listOfDeals = await this.cheapShark.getListOfDeals(storeID,sendUpperPrice);
      console.log(listOfDeals);
    }
    else{
      const listOfDeals = await this.cheapShark.getListOfDeals(storeID);
      console.log(listOfDeals);
    }
  }

  // Deal Lookup
  @get('/deals/{id}')
  async getDealLookup(
      @param.path.string('id') id:string
  ){
    const dealLookup = await this.cheapShark.getDealLookup(id);
    console.log(dealLookup);
  }


}
