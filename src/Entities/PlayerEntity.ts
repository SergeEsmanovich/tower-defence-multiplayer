/// <reference path="../../src/Helper/Point.ts" />
namespace Entities {
    export class PlayerEntity {
        constructor() {
            this.position = new Helper.Point(200, 200);
        }

        public position: Helper.Point;
        public speed:number = 10;
    }
}