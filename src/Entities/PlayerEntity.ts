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

        public targetVector: Helper.Point = new Helper.Point();

        public speed = 1;

        public type = Server.Config.ENTITY_TYPES.PLAYER_ENTITY;

        public clientTime: number;

        setClient(client: Controller.Client) {
            this.client = client;
        }

        public stepToPoint() {
            if (this.activeMove) {
                var length = this.targetVector.getLengthIsCurrentPointVector();
                this.position.x += this.speed * this.targetVector.x / length;
                this.position.y += this.speed * this.targetVector.y / length;
            }
        }


        public calcVector(input: number) {
            this.input.deconstructInputBitmask(input);
            this.activeMove = false;
            this.targetVector = new Helper.Point();
            if (this.input.isLeft()) {
                console.log('left');
                this.targetVector.addVector(new Helper.Point(-1, 0));
                this.activeMove = true;
            }
            if (this.input.isRight()) {
                console.log('right');
                this.targetVector.addVector(new Helper.Point(1, 0));
                this.activeMove = true;
            }
            if (this.input.isUp()) {
                console.log('up');
                this.targetVector.addVector(new Helper.Point(0, -1));
                this.activeMove = true;
            }
            if (this.input.isDown()) {
                console.log('down');
                this.targetVector.addVector(new Helper.Point(0, 1));
                this.activeMove = true;
            }

            // console.log(this.activeMove);
            // console.log(this.targetVector);
        }


    }
}
