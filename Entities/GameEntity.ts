/// <reference path="../Helper/Point.ts" />
namespace Entities {
    export class GameEntity {
        constructor(stage: PIXI.Container, name: string) {
            this.stage = stage;
            this.loader = PIXI.loader;
            this.name = name;
            this.initialize();
        }

        public name: string;
        public loader: any;
        public view: any;
        public stage: PIXI.Container;

        public speed: number = 1;

        public targetPosition: Helper.Point = null;

        public activeMove = false;


        private initialize() {
            this.view = new PIXI.Sprite(this.loader.resources[this.name].texture);
            this.view.anchor.x = 0.5;
            this.view.anchor.y = 0.5;
            this.view.position.x = 200;
            this.view.position.y = 150;
        }

        public stepToPoint(point: Helper.Point = null) {
            if (!point) {
                point = this.targetPosition;
                console.log(point);
            }
            if (this.activeMove && point) {
                point.x = point.x - this.view.position.x;
                point.y = point.y - this.view.position.y;

                var scalar = Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y, 2));
                this.view.position.x += this.speed * point.x / scalar;
                this.view.position.y += this.speed * point.y / scalar;

                var length = Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y, 2));
                if(length< 50){
                    this.activeMove = false
                }
            }

        }

    }
}
