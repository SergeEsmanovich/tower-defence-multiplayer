/// <reference path="../../src/Helper/Point.ts" />
/// <reference path="../../src/Server/Config.ts" />
/// <reference path="../../src/Helper/Collection.ts" />
namespace Entities {
    export class GameEntity implements Helper.IKey {

        inputCode: number;
        clientTime: number;
        deltaTime: number;
        public notFoundedCount: number = 0;

        calcVector(i: number): any {
            return undefined;
        }

        constructor() {
            this.position = new Helper.Point();
        }

        public key: string;
        public id: number;
        public name: string;
        public type: number = Server.Config.ENTITY_TYPES.CANDY_ENTITY;
        public position: Helper.Point;

        public speed: number = 2.5;

        public targetPosition: Helper.Point = null;

        public activeMove = false;

        public time: number;

        public velocityVector: Helper.Point = new Helper.Point();

        public setName(name: string) {
            this.name = name;
        }

        public radius = 16;

        public collisionDetected = false;

        public onCollision(entity: Entities.GameEntity): any {
            this.collisionDetected = true;
            let normal = this.position.getVector(entity.position);
            this.velocityVector.x += normal.x;
            this.velocityVector.y += normal.y;


            // this.velocityVector.multiplyVector(-1);
            this.collisionDetected = false;

        }

        public stepToPoint(point: Helper.Point = null) {
            if (this.activeMove && !this.collisionDetected) {
                point = this.velocityVector;
                var length = point.getLengthIsCurrentPointVector();

                // if (length < 10) {
                //     this.activeMove = false;
                // }

                // if (length) {
                this.position.x += this.speed * point.x / length;
                this.position.y += this.speed * point.y / length;
                // }

            }
        }

        public setPosition(position: Helper.Point) {
            this.position = new Helper.Point(position.x, position.y);
        }

        public getPosition() {
            return new Helper.Point(this.position.x, this.position.y);
        }

        getPositionString(): string {
            let point = this.getPosition();
            return ~~point.x + ',' + ~~point.y;
        }

        setTargetPosition(point: Helper.Point) {
        }

    }
}
