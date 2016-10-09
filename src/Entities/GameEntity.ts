/// <reference path="../../src/Helper/Point.ts" />
namespace Entities {
    export class GameEntity {
        constructor() {
            this.position = new Helper.Point();
        }

        public id: number;
        public name: string;
        public type: number;
        public position: Helper.Point;

        public speed: number = 1;

        public targetPosition: Helper.Point = null;

        public activeMove = false;


        public setName(name: string) {
            this.name = name;
        }


        public stepToPoint(point: Helper.Point = null) {

        }

        getPositionString():string {
            return this.position.x + ',' + this.position.y;
        }

    }
}
