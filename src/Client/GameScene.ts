/// <reference path="../../src/Entities/GameEntityView.ts" />
/// <reference path="../../src/Controller/FieldViewController.ts" />
namespace Client {
    export class GameScene {

        constructor() {
            this.fieldViewController = new Conroller.FieldViewController();

            this.fieldViewController.setScene(this);

            this.resizeFullScreen();
            this.renderer = PIXI.autoDetectRenderer(this.screen.width, this.screen.health, {autoResize: true}, false);
            $('#gameContainer').append(this.renderer.view);

            this.stage = new PIXI.Container();
            this.world = new PIXI.Container();
            this.stage.addChild(this.world);

            this.world.position.x = 800 * 0.5;
            this.world.position.y = 600 * 0.5;

            this.world.pivot.x = 800 * 0.5;
            this.world.pivot.y = 600 * 0.5;

            this.fieldViewController.delegateWorldContainer(this.world);

            var style = {
                fontFamily: 'Arial',
                fontSize: '36px',
                fontStyle: 'italic',
                fontWeight: 'bold',
                fill: '#F7EDCA',
                stroke: '#4a1850',
                strokeThickness: 5,
                dropShadow: true,
                dropShadowColor: '#000000',
                dropShadowAngle: Math.PI / 6,
                dropShadowDistance: 6,
                wordWrap: true,
                wordWrapWidth: 440
            };
            this.richText = new PIXI.Text('Ping:' + this.deltaPing.ping.toString(), style);
            this.richText.x = 30;
            this.richText.y = 30;

            this.stage.addChild(this.richText);


            this.update();
        }

        public fieldViewController: Conroller.FieldViewController;
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

        public richText: PIXI.Text;
        public world: PIXI.Container;
        public stage: PIXI.Container;
        public renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;

        // public bunny:any;
        public player: Client.GameEntityView = null;

        public tad: Client.GameEntityView;

        public walls: Client.GameEntityView[] = [];

        public bunnyBuffer: any[] = [];

        public deltaPing = {
            packages: 1,
            ping: 1,
            limit: 50,
            delta: 1
        };

        public update() {
            requestAnimationFrame(this.update.bind(this));
            if (this.player) {
                let focusPoint = this.player.getPosition();
                this.focusToPoint(focusPoint);
            }

            this.fieldViewController.entityViews.forEach((entityView: Client.GameEntityView)=> {
                entityView.stepToPoint();
            });
            this.renderer.render(this.stage);
        };

        public createEntityView(stage: PIXI.Container, name: string) {
            if (PIXI.loader.loading == false) {

            }
        }


        public addEntity(anEntityView: any) {
            this.world.addChild(anEntityView);
        };


        public removeEntity(anEntityView: any) {
            this.stage.removeChild(anEntityView);
        };


        public calculateDeltaPing(timePing: number) {
            this.deltaPing.delta += timePing;
            this.deltaPing.packages++;
            // if (this.deltaPing.packages > 10) {
            this.deltaPing.ping = ~~(this.deltaPing.delta / this.deltaPing.packages);
            this.richText.text = 'Ping:' + this.deltaPing.ping;
            // }


            // console.log(this.deltaPing);
            // this.deltaPing.ping = (this.deltaPing.ping == 0) ? 1 : this.deltaPing.ping;
            if (this.deltaPing.packages > this.deltaPing.limit) {
                this.deltaPing.delta = 1;
                this.deltaPing.packages = 1;
            }
        }

        public focusToPoint(focus: Helper.Point) {
            let worldPos = new Helper.Point(this.world.position.x, this.world.position.y);
            let length = focus.getLengthToPoint(worldPos);
            if (length) {
                let point = new Helper.Point(this.screen.width * 0.5 + (this.screen.width * 0.25 - focus.x), this.screen.health * 0.25 + (this.screen.health * 0.6 - focus.y));
                let vector = point.getVector(worldPos);
                this.world.position.x += ~~(length / 30) * vector.x / length;
                this.world.position.y += ~~(length / 30) * vector.y / length;
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
