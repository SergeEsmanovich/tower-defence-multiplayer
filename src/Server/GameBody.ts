namespace Server {
    import FieldController = Controller.FieldController;
    export class GameBody {

        constructor(fieldController: FieldController) {
            this.fieldController = fieldController;
            this.buildWorld();

            // this.interval = setInterval(()=> {
            //     this.update();
            // }, 1000 / 30);
            //
            // this.interval = setInterval(()=> {
            //     this.IINPC();
            // }, 10000);

        }

        public world: any;
        public msg: string;
        public interval: any;
        public fieldController: Controller.FieldController;

        public receiveMessage(msg: string, socket: any) {
            this.msg = msg;
        }

        public gameTick = 0;
        public BOX2D: any;

        public update() {
            this.gameTick++;
            //
            // this.fieldController.collisionContainer.reset();
            //
            // this.fieldController.players.forEach((entity: Entities.PlayerEntity)=> {
            //     this.fieldController.collisionContainer.add(entity);
            //     entity.stepToPoint();
            // });
            //
            // this.fieldController.entities.forEach((entity: Entities.GameEntity)=> {
            //     this.fieldController.collisionContainer.add(entity);
            //     entity.stepToPoint();
            // });
        }

        public IINPC() {
            this.fieldController.entities.forEach((entity: Entities.GameEntity)=> {

                let playerId = Helper.Core.getRandomInt(0, this.fieldController.players.count());
                if (playerId) {
                    let foundPlayer: Entities.PlayerEntity = null;
                    this.fieldController.players.forEach((player: Entities.PlayerEntity, key: number)=> {
                        if ((key + 1) == playerId) {
                            foundPlayer = player;
                            return;
                        }
                    });

                    if (foundPlayer) {
                        entity.velocityVector = foundPlayer.getPosition().getVector(entity.position);
                        entity.activeMove = true;
                    } else {
                        entity.activeMove = false;
                    }

                }


            });
        }

        private buildWorld() {
            this.BOX2D = require('./lib/box2d/box2d');
            this.world = new this.BOX2D.b2World(new this.BOX2D.b2Vec2(0, 0), true);
            this.createBalls();

            //
            //
            // var fixtureDef = new this.BOX2D.b2FixtureDef();
            // fixtureDef.shape = new this.BOX2D.b2CircleShape(20);
            // fixtureDef.friction = 0.4;
            // fixtureDef.restitution = 0.6;
            // fixtureDef.density = 1.0;
            // var ballBd = new this.BOX2D.b2BodyDef();
            // ballBd.type = this.BOX2D.b2Body.b2_dynamicBody;
            // ballBd.position.Set(50, 100);
            // var body2 = this.world.CreateBody(ballBd);
            // body2.CreateFixture(fixtureDef);

            // body2.ApplyForce(new this.BOX2D.b2Vec2(50, 0),body2.GetWorldCenter());

            // this.world.CreateBody(ballBd);

            // this.createBall(this.world, 0, 0);

            this.step();

        }

        private step() {
            var timeStep = 1.0 / 60;
            var iteration = 1;
            this.world.Step(timeStep, iteration);
            setTimeout(()=> {

                // console.log(this.world.m_bodyList);
                // for (var b = this.world.m_bodyList; b; b = b.m_next) {
                //     console.log(b.m_xf.position);
                //     // for (var s = b.GetShapeList(); s != null; s = s.GetNext()) {
                //     //     console.log(s);
                //     // }
                // }

                this.fieldController.entities.forEach((entity: Entities.GameEntity)=> {
                    entity.setPosition(entity.body.m_xf.position);

                });


                this.step();
            }, 10);
        }


        private createBalls() {
            let ball = new Entities.GameEntity();
            ball.world = this.world;
            var fixtureDef = new this.BOX2D.b2FixtureDef();
            fixtureDef.shape = new this.BOX2D.b2CircleShape(20);
            fixtureDef.friction = 0.4;
            fixtureDef.restitution = 0.6;
            fixtureDef.density = 1.0;
            var ballBd = new this.BOX2D.b2BodyDef();
            ballBd.type = this.BOX2D.b2Body.b2_dynamicBody;
            ballBd.position.Set(100, 100);

            ball.setPosition(new Helper.Point(100, 100));
            ball.id = this.fieldController.getNextEntityId();
            ball.key = ball.id.toString();
            ball.body = this.world.CreateBody(ballBd);
            ball.body.CreateFixture(fixtureDef);
            // ball.body.ApplyImpulse(new this.BOX2D.b2Vec2(50, 0), new this.BOX2D.b2Vec2(100, 100));
            // ball.body.ApplyForce(new this.BOX2D.b2Vec2(50, 0), ball.body.GetWorldCenter());

            this.fieldController.addEntity(ball);
        }


        public  createBall(world: any, x: number, y: number) {
            // var ballSd = new this.BOX2D.b2CircleDef();
            // ballSd.density = 1.0;
            // ballSd.radius = 20;
            // ballSd.restitution = 1.0;
            // ballSd.friction = 0;
            // var ballBd = new this.BOX2D.b2BodyDef();
            // ballBd.AddShape(ballSd);
            // ballBd.position.Set(x, y);
            // return world.CreateBody(ballBd);
        }

    }
}
