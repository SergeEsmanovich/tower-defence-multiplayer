/// <reference path="../Entities/GameEntity.ts" />
namespace Client {
    export class GameScene {
        constructor() {

            this.renderer = PIXI.autoDetectRenderer(800, 600, {autoResize: true}, true);
            $('#gameContainer').append(this.renderer.view);

            this.stage = new PIXI.Container();
            this.world = new PIXI.Container();
            this.stage.addChild(this.world);

            this.world.position.x = 800*0.5;
            this.world.position.y = 600*0.5;

            this.world.pivot.x = 800*0.5;
            this.world.pivot.y = 600*0.5;

            this.bunny = this.createEntityView(this.stage, 'bunny');
            this.addEntity(this.bunny.view);

            this.tad = this.createEntityView(this.stage, 'tad');
            this.tad.view.position.x += 100;
            this.addEntity(this.tad.view);


            this.update();
        }

        public world: PIXI.Container;
        public stage: PIXI.Container;
        public renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;

        public bunny: Entities.GameEntity;

        public tad: Entities.GameEntity;

        public bunnyBuffer: any[] = [];

        public update() {
            requestAnimationFrame(this.update.bind(this));

            // this.world.position.x -= 0.1;
            this.bunny.stepToPoint();

            this.renderer.render(this.stage);
        };

        public createEntityView(stage: PIXI.Container, name:string) {
            if (PIXI.loader.loading == false) {
                return new Entities.GameEntity(stage, name);
            }
        }


        public addEntity(anEntityView: any) {
            this.world.addChild(anEntityView);
        };


        public removeEntity(anEntityView: any) {
            this.stage.removeChild(anEntityView);
        };

        public updateBunnyPosition(msg: any) {
            let point = new Helper.Point();
            let temp = msg.split('|');
            point.x = temp[0];
            point.y = temp[1];
            this.bunnyBuffer.push(point);

            console.log(this.bunnyBuffer);

            setTimeout(()=> {
                point = this.bunnyBuffer.pop();
                if(point) {
                    this.bunny.targetPosition = point;
                    this.bunny.activeMove = true;
                }
            }, 100);

        }




    }
}
