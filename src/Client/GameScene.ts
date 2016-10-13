/// <reference path="../../src/Entities/GameEntityView.ts" />
/// <reference path="../../src/Controller/FieldViewController.ts" />
/// <reference path="../../src/Controller/GameInfoViewConroller.ts" />
namespace Client {
    export class GameScene {

        constructor() {
            this.fieldViewController.setScene(this);
            this.resizeFullScreen();
            this.renderer = PIXI.autoDetectRenderer(this.screen.width, this.screen.health, {autoResize: true}, false);
            $('#gameContainer').append(this.renderer.view);

            this.stage = new PIXI.Container();
            this.gameInfo.setStage(this.stage);
            this.gameInfo.displayPing();

            this.world = new PIXI.Container();
            this.stage.addChild(this.world);

            this.world.position.x = 800 * 0.5;
            this.world.position.y = 600 * 0.5;

            this.fieldViewController.delegateWorldContainer(this.world);
            this.update();
        }

        public fieldViewController: Conroller.FieldViewController = new Conroller.FieldViewController();

        public gameInfo: Controller.GameInfoView = new Controller.GameInfoView();

        public screen: any = {
            width: 0,
            health: 0
        };

        public setWindowsSize() {
            this.screen.width = $(window).width();
            this.screen.health = $(window).height();
        }

        public resizeFullScreen() {
            this.setWindowsSize();
            $(window).resize(()=> {
                this.setWindowsSize();
                this.renderer.resize(this.screen.width, this.screen.health);
            });
        }

        public world: PIXI.Container;
        public stage: PIXI.Container;
        public renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;

        public player: Client.GameEntityView = null;

        public update() {
            requestAnimationFrame(this.update.bind(this));
            if (this.player) {
                let focusPoint = this.player.getPosition();
                this.focusToPoint(focusPoint);
            }

            this.fieldViewController.ids.forEach((entityId: number)=> {
                this.fieldViewController.entityViews[entityId].stepToPoint();
            });
            this.renderer.render(this.stage);
        };

        public addEntity(anEntityView: any) {
            this.world.addChild(anEntityView);
        };


        public removeEntity(anEntityView: any) {
            this.world.removeChild(anEntityView);
        };


        public focusToPoint(focus: Helper.Point) {
            let worldPos = new Helper.Point(this.world.position.x, this.world.position.y);
            let length = focus.getLengthToPoint(worldPos);

            if (length) {
                let point = new Helper.Point(this.screen.width * 0.5 - focus.x, this.screen.health * 0.5 - focus.y);
                let vector = point.getVector(worldPos);
                this.world.position.x += ~~(length / 150) * vector.x / length;
                this.world.position.y += ~~(length / 150) * vector.y / length;
            }
        }


        updateWorld(msg: string) {
            this.fieldViewController.parseMessageFromServer(msg);
        }

        setPlayer(player: any) {
            this.player = player;
        }
    }
}
