/// <reference path="../../src/Helper/Point.ts" />
/// <reference path="../../src/Controller/Client.ts" />
/// <reference path="GameEntity.ts" />
namespace Entities {
    export class PlayerEntity extends Entities.GameEntity{
        constructor() {
           super();
        }

        public client: Controller.Client;
        public input:Helper.Input;

        public type = Server.Config.ENTITY_TYPES.PLAYER_ENTITY;

        setClient(client: Controller.Client) {
            this.client = client;
        }
    }
}
