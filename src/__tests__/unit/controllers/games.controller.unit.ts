import { createStubInstance, expect , sinon, StubbedInstanceWithSinonAccessor } from '@loopback/testlab';
import { GameControllerController } from "../../../controllers";
import { GamesService } from "../../../services";
import { GameRepository } from "../../../repositories";
import { Game } from "../../../models";
import {repository} from "@loopback/repository";

describe('GameControllerController', () => {
    let gameRepository: StubbedInstanceWithSinonAccessor<GameRepository>;
    let gamesService : GamesService;

    let getListOfGames : sinon.SinonStub;
    let getGameAlert : sinon.SinonStub;
    let getGameLookup : sinon.SinonStub;
    let getMultiGameLookup : sinon.SinonStub;

    let gamesController: GameControllerController;
    beforeEach(async() => {
        gameRepository = createStubInstance(GameRepository);
        gamesService = { getListOfGames: sinon.stub(),getGameAlert:sinon.stub(),getGameLookup:sinon.stub(), getMultiGameLookup:sinon.stub()}
        getListOfGames = gamesService.getListOfGames as sinon.SinonStub;
        getGameAlert = gamesService.getGameAlert as sinon.SinonStub;
        getGameLookup = gamesService.getGameLookup as sinon.SinonStub;
        getMultiGameLookup = gamesService.getMultiGameLookup as sinon.SinonStub;
        gamesController = new GameControllerController(gameRepository, gamesService);
    })

    //Service test
    describe('getListOfGames', () => {
        it('should get game', async () => {
            const game = {title:'batman'};
            getListOfGames.resolves(game);

            const details = await gamesService.getListOfGames('batman');
            expect(details).to.equal(game);
        })
    })
    //controller test
   /* describe('getListOfGames', () => {
        it('should get game', async () => {
            const game:any = {title:'batman',steamAppID:'35140'}
            gameRepository.stubs.findOne.resolves(game);
            const details = await gamesController.getListOfGames2('batman','35140')

            expect(details).to.containEql(game);

        })
    })*/


})