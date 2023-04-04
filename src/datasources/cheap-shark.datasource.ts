import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'CheapShark',
  connector: 'rest',
  options: {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  },
  operations: [
    {
      template: {
        method: 'GET',
        url: 'https://www.cheapshark.com/api/1.0/stores',
      },
      functions: {
        getAllStores: [],
      },
    },
    {
      template: {
        method: 'GET',
        url: 'https://www.cheapshark.com/api/1.0/stores?lastChange',
      },
      functions: {
        getAllStoresLastChange: [],
      },
    },
    {
      template: {
        method: 'GET',
        url: 'https://www.cheapshark.com/api/1.0/deals?storeID={storeID}' +
            '{upperPrice}'
      },
      functions: {
        getListOfDeals: ['storeID','upperPrice'],
      }
    },
    {
      template: {
        method: 'GET',
        url: 'https://www.cheapshark.com/api/1.0/deals?id={id}'
      },
      functions: {
        getDealLookup: ['id'],
      }
    },
    {
      template: {
        method: 'GET',
        url: 'https://www.cheapshark.com/api/1.0/games?title={title}&steamAppID={steamAppID}'

      },
      query:{

      },
      functions: {
        getListOfGames: ['title','steamAppID'],
      }
    },
    {
      template: {
        method: 'GET',
        url: '{url}'
      },
      functions: {
        getGameLookup: ['url'],
      }
    },
    {
      template: {
        method: 'GET',
        url: '{url}'
      },
      functions: {
        getMultiGameLookup: ['url'],
      }
    },
    {
      template: {
        method: 'GET',
        url: '{url}'
      },
      functions: {
        getGameAlert: ['url'],
      }
    },
  ],
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class CheapSharkDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'CheapShark';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.CheapShark', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
