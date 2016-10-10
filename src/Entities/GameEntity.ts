/// <reference path="../../src/Helper/Point.ts" />
/// <reference path="../../src/Server/Config.ts" />
namespace Entities {
    export class GameEntity {
        constructor() {
            this.position = new Helper.Point();
        }

        public id: number;
        public name: string;
        public type: number = Server.Config.ENTITY_TYPES.CANDY_ENTITY;
        public position: Helper.Point;

        public speed: number = 0.5;

        public targetPosition: Helper.Point = null;

        public activeMove = false;


        public setName(name: string) {
            this.name = name;
        }


        public stepToPoint(point: Helper.Point = null) {
            if (this.activeMove && this.targetPosition) {
                point = this.targetPosition.getVector(this.position);

                var length = point.getLengthIsCurrentPointVector();

                if (length < 10) {
                    this.activeMove = false;
                }

                if(length) {
                    this.position.x += this.speed * point.x / length;
                    this.position.y += this.speed * point.y / length;
                }


            }
        }

        public setPosition(position: Helper.Point) {
            this.position = position;
        }

        getPositionString(): string {
            return ~~this.position.x + ',' + ~~this.position.y;
        }

    }
}
