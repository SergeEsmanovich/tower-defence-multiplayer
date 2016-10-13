/// <reference path="../../src/Entities/GameEntity.ts" />
/// <reference path="../../src/Entities/PlayerEntity.ts" />
/// <reference path="../../src/Helper/Collection.ts" />
namespace Controller {
    import PlayerEntity = Entities.PlayerEntity;
    export class FieldController {

        public entities = new Helper.Collection();

        public players = new Helper.Collection();
        private NextEntityId = 1;

        public playerTime: number;

        public addPlayer(client: Controller.Client) {
            let player = new Entities.PlayerEntity();
            player.id = this.getNextEntityId();
            player.key = client.socketId;
            player.setClient(client);
            this.players.add(player);
        }

        public findPlayer(playerId: string) {
            return this.players.get(playerId);
        }

        public addEntity(entity: Entities.GameEntity) {
            this.entities.add(entity);
        }

        public createMessageForSend(id: string) {
            let message: string = '';

            this.players.forEach((player)=> {
                if (player.client.socketId != id) {
                    this.playerTime = player.clientTime;
                    message += player.id + ',' + Server.Config.ENTITY_TYPES.OTHER_PLAYER_ENTITY + ',' + player.getPositionString() + ',' + (new Date().getTime() - this.playerTime) + '|';
            this.players.forEach((player:Entities.PlayerEntity)=> {
                if (player.key != id) {
                    message += player.id + ',' + Server.Config.ENTITY_TYPES.OTHER_PLAYER_ENTITY + ',' + player.getPositionString() + '|';
                } else {
                    message += player.id + ',' + player.type + ',' + player.getPositionString() + ',' + this.playerTime + '|';
                }
            });


            this.entities.forEach((entity: Entities.GameEntity, key: number)=> {
                message += entity.id + ',' + entity.type + ',' + entity.getPositionString() + ',' + (new Date().getTime() - this.playerTime);
                if (key != this.entities.length - 1) {
                    message += '|';
                }
            this.entities.forEach((entity: Entities.GameEntity)=> {
                message += entity.id + ',' + entity.type + ',' + entity.getPositionString();
                message += '|';
            });

            message = message.slice(0, -1);
            return message;
        }

        public getNextEntityId() {
            return this.NextEntityId++;
        }
    }
}
