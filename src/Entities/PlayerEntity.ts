/// <reference path="../../src/Helper/Point.ts" />
/// <reference path="../../src/Controller/Client.ts" />
/// <reference path="GameEntity.ts" />
namespace Entities {
    export class PlayerEntity extends Entities.GameEntity {
        constructor() {
            super();
            this.input = new Helper.Input();
        }

        public client: Controller.Client;
        public input: Helper.Input;
        public inputCode: number = 0;

        public speed = 10;

        public type = Server.Config.ENTITY_TYPES.PLAYER_ENTITY;

        setClient(client: Controller.Client) {
            this.client = client;
        }

        public stepToPoint() {
            // console.log('update');
            // this.setPosition(this.position);
        }


        public calcVector(input: number) {
            // this.position.x += 10;
            this.input.deconstructInputBitmask(input);
            console.log(input);
            if (this.input.isLeft()) {
                this.position.x -= 1;
            }
            if (this.input.isRight()) {
                this.position.x += 1;
            }
            if (this.input.isUp()) {
                console.log('up');
                this.position.y -= 1;
            }
            if (this.input.isDown()) {
                this.position.y += 1;
            }

            console.log(this.position.x + ',' + this.position.y);
        }


    }
}
