/// <reference path="../../src/Entities/GameEntityView.ts" />
/// <reference path="../../src/Controller/FieldViewController.ts" />
namespace Client {
    export class GameScene {

        constructor() {
            this.fieldViewController = new Conroller.FieldViewController();

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

            this.bunny = this.createEntityView(this.stage, 'bunny');
            this.bunny.scene = this;
            this.bunny.setScale(0.5);
            this.addEntity(this.bunny.view);

            this.tad = this.createEntityView(this.stage, 'tad');
            this.tad.view.position.x += 100;
            this.tad.view.blendMode = PIXI.BLEND_MODES.ADD;
            this.addEntity(this.tad.view);

            // for (let i = 0; i < 100; i++) {
            //     let wall = this.createEntityView(this.stage, 'tad');
            //     wall.view.position.x = Helper.Core.getRandomInt(-this.screen.width, this.screen.width);
            //     wall.view.position.y = Helper.Core.getRandomInt(-this.screen.health, this.screen.health);
            //     this.addEntity(wall.view);
            //     this.walls.push(wall);
            // }


            this.focusToPoint();


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

        public resizeFullScreen() {
            this.screen.width = $(window).width();
            this.screen.health = $(window).height();
            $(window).resize(()=> {
                this.renderer.resize(this.screen.width, this.screen.health);
            });
        }

        public richText: PIXI.Text;
        public world: PIXI.Container;
        public stage: PIXI.Container;
        public renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;

        // public bunny:any;
        public bunny: Client.GameEntityView;

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

            // this.world.position.x -= 0.1;
            this.bunny.stepToPoint();
            this.focusToPoint();
            // this.tad.stepToPoint();

            this.renderer.render(this.stage);
        };

        public createEntityView(stage: PIXI.Container, name: string) {
            if (PIXI.loader.loading == false) {
                let entityView = new Client.GameEntityView();
                entityView.setStage(stage);
                entityView.setName(name);
                entityView.initialize();
                return entityView;
            }
        }


        public addEntity(anEntityView: any) {
            this.world.addChild(anEntityView);
        };


        public removeEntity(anEntityView: any) {
            this.stage.removeChild(anEntityView);
        };

        public updateBunnyPosition(msg: string = null) {

            if (msg) {
                let point = new Helper.Point();
                let temp: any = msg.split('|');
                point.x = temp[0] * 1;
                point.y = temp[1] * 1;
                point.serverTime = temp[2] * 1;
                point.id = temp[3] * 1;
                point.timePing = point.ping();

                if (point.timePing.toString() == 'NaN') {
                    console.log(point);
                }

                this.calculateDeltaPing(point.timePing);

                this.bunnyBuffer.push(point);
                // console.log(this.bunnyBuffer.length);
            }

            if (this.bunnyBuffer.length > 4) {

                let currentPosition = this.bunny.getPosition();
                let nextPosition = this.bunnyBuffer.shift();
                this.bunny.targetPosition = nextPosition;
                let vec = nextPosition.getVector(currentPosition);
                this.bunny.view.rotation = Math.atan2(vec.y, vec.x) + Math.PI / 2 + Math.PI;
                let length = currentPosition.getLengthToPoint(nextPosition);

                // console.log(this.deltaPing.ping);
                // console.log(length);
                // console.log(nextPosition.ping());
                //Может нужно делить на количество кадров
                this.bunny.speed = length / 8;
                // console.log(this.deltaPing.ping);

                // if (this.bunny.activeMove === true) {
                //     console.log('very sorry I didn\'t come');
                // }
                if (length > 10) {
                    this.bunny.activeMove = true;
                }

            }


        }

        public updateTadPosition(msg: any) {
            // this.tad.setPosition(new Helper.Point());
            if (this.bunnyBuffer.length > 1) {
                let point = new Helper.Point(this.bunnyBuffer[this.bunnyBuffer.length - 1].x, this.bunnyBuffer[this.bunnyBuffer.length - 1].y);
                this.tad.setPosition(point);
            }
        }

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

        public focusToPoint() {
            let worldPos = new Helper.Point(this.world.position.x, this.world.position.y);
            let bunnyPosition = this.bunny.getPosition();
            let length = bunnyPosition.getLengthToPoint(worldPos);
            // console.log(bunnyPosition);
            let point = new Helper.Point(this.screen.width * 0.25 + (this.screen.width * 0.4 - bunnyPosition.x), this.screen.health * 0.25 + (this.screen.health * 0.6 - bunnyPosition.y));

            let vector = point.getVector(worldPos);

            this.world.position.x += ~~(length / 30) * vector.x / length;
            this.world.position.y += ~~(length / 30) * vector.y / length;
        }


        updateWorld(msg: string) {
            this.fieldViewController.parseMessageFromServer(msg);
        }
    }
}
