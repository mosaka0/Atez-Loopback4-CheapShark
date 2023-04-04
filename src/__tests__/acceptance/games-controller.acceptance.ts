import {Client, createRestAppClient, expect} from '@loopback/testlab';
import { setupApplication } from './test-helper';
import { GameInfoApplication } from "../..";

describe('GameControllerController', ()=> {
    let app: GameInfoApplication;
    let client: Client;

    before('setupApplication', async()=> {
        ({ app, client } = await setupApplication());
    });

    after(async () => {
        await app.stop();
    });

    it('Should get game properties by title',async () => {
        const response = await client.get('/games?title=batman').expect(200);
    })

   /*it('should create a game to db', async () => {

    })*/

})
