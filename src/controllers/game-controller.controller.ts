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
import {CheapSharkGame, Deal, Game, GameDeals, GameLookup} from '../models';
import {GameRepository} from '../repositories';
import {inject} from "@loopback/core";
import {CheapShark} from "../services";

export class GameControllerController {
  constructor(
    @repository(GameRepository)
    public gameRepository : GameRepository,
    @inject('services.CheapShark')
    protected cheapShark: CheapShark
  ) {}

  // 2.1 ve 2.2 Oyun yoksa DB'ye kaydet, varsa en güncel verilerini çek güncelle
  @get('/games')
  async getListOfGames2(
    @param.query.string('title') title:string,
    @param.query.string('steamAppID') steamAppID:string,
  ):Promise<any> {

    let url = 'https://www.cheapshark.com/api/1.0/games?'
    if(title){
      url = url+'title='+title;
    }
    if(steamAppID){
      url = url+'&steamAppID='+steamAppID;
    }
    const getListOfGames = await this.cheapShark.getListOfGames(url);
    console.log(getListOfGames);

    // @ts-ignore
    getListOfGames.forEach(async (game:CheapSharkGame) => {
      const findIndex = await this.gameRepository.findOne({where:{gameID:game.gameID}});
      const newGame = new Game();
      newGame.gameID = game.gameID;
      newGame.steamAppID = game.steamAppID;
      newGame.cheapest = game.cheapest;
      newGame.cheapestDealID = game.cheapestDealID;
      newGame.external = game.external;
      newGame.thumb = game.thumb;
      if(!findIndex?.gameID){
        return await this.gameRepository.create(newGame);
      }
      else{
        return await this.gameRepository.updateAll(newGame,{gameID:newGame.gameID});
      }
    })

  }

  // 2.3 Oyunun fiyatı için alarm kurma
  @get('/games/alert')
  async gameAlert(
      @param.query.string('action') action:string,
      @param.query.string('email') email:string,
      @param.query.string('gameID') gameID:string,
      @param.query.string('price') price:string,
  ){
    let url = 'https://www.cheapshark.com/api/1.0/alerts?'
    if(action){
      url = url+'action='+action;
    }
    if(email){
      url = url+'&email='+email;
    }
    if(gameID){
      url = url+'&gameID='+gameID;
    }
    if(price){
      url = url+'&price='+price;
    }
    const alerts = await this.cheapShark.getGameAlert(url);
    console.log(alerts);
    return "Alert On!"
  }

  // 2.4 Aradığım oyunun en indirimli halini ve mağazasını gösterme
  @get('/games/findID')
  async gameLookup(
      @param.query.string('id') id:string
  ) {
    let url = 'https://www.cheapshark.com/api/1.0/games?'
    if(id){
      url = url+'id='+id;
    }
    const games:GameLookup = await this.cheapShark.getGameLookup(url);
    let discount:GameDeals={storeID:"",dealID:"",price:"",retailPrice:"",savings:""};
    let maxDiscount:number = 0;
    games.deals.forEach((deal) => {
      if(parseInt(deal.savings)>maxDiscount){
        discount = deal;
        maxDiscount = parseInt(deal.savings);
      }
    })

    return discount;
  }

  // 2.5 Birden fazla oyun aratıldığında indirimlerini gör.
  @get('/games/all')
  async multiGameLookup(
      @param.query.string('ids') ids:string
  ):Promise<GameDeals[]> {
    let url = 'https://www.cheapshark.com/api/1.0/games?'
    if(ids){
      url = url+'ids='+ids;
    }
    const games = await this.cheapShark.getMultiGameLookup(url);
    let discounts:GameDeals[] = [];
    for(let key in games){
      console.log(games[key as keyof typeof games]);
      const datas:GameLookup = games[key as keyof typeof games];
      datas.deals.forEach((deal) => {
        if(parseInt(deal.savings)>0){
          discounts?.push(deal);
        }
      })
    }
    return discounts;
  }

}
