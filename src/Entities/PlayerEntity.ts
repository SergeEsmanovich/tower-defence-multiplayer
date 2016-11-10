/// <reference path="../../src/Helper/Point.ts" />
/// <reference path="../../src/Controller/Client.ts" />
/// <reference path="GameEntity.ts" />
namespace Entities {
    export class PlayerEntity extends Entities.GameEntity {
        constructor() {
            super();
            this.input = new Helper.Input();
        }

        public BOX2D: any;

        public client: Controller.Client;
        public input: Helper.Input;
        public inputCode: number = 0;

        public targetVector: Helper.Point = new Helper.Point();

        public speed = 10;

        public type = Server.Config.ENTITY_TYPES.PLAYER_ENTITY;

        public clientTime: number;
        public deltaTime: number;

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

            if (this.input.isLeft()) {
                this.body.ApplyImpulse(new this.BOX2D.b2Vec2(-200, 0), this.body.GetWorldCenter());
            }
            if (this.input.isRight()) {
                this.body.ApplyImpulse(new this.BOX2D.b2Vec2(200, 0), this.body.GetWorldCenter());
            }
            if (this.input.isUp()) {
                this.body.ApplyImpulse(new this.BOX2D.b2Vec2(0, -200), this.body.GetWorldCenter());
            }
            if (this.input.isDown()) {
                this.body.ApplyImpulse(new this.BOX2D.b2Vec2(0, 200), this.body.GetWorldCenter());
            }
            // console.log(this.position);
        }


    }
}
