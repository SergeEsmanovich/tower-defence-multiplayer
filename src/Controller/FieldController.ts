/// <reference path="../../src/Entities/GameEntity.ts" />
namespace Conroller {
    export class FieldController {

        public entities: Entities.GameEntity[] = [];
        public players: Conroller.Client[] = [];
        private NextEntityId = 1;

        public addPlayer(client: Conroller.Client) {
            this.players.push(client);
        }

        public addEntity(entity: Entities.GameEntity) {
            this.entities.push(entity);
        }

        public createMessageForSend() {
            let message: string = '';
            this.entities.forEach((entity: Entities.GameEntity, key: number)=> {
                message += entity.id + ',' + entity.type + ',' + entity.getPositionString();
                if (key != this.entities.length - 1) {
                    message += '|';
                }
            });
            return message;
        }

        public getNextEntityId() {
            return this.NextEntityId++;
        }
    }
}
