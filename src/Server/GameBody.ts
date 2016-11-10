namespace Server {
    import FieldController = Controller.FieldController;
    export class GameBody {

        constructor(fieldController: FieldController) {
            this.fieldController = fieldController;
            this.BOX2D = this.fieldController.BOX2D;
            this.world = this.fieldController.world;
            for (let i = 0; i < 1000; i++) {
                this.createBall();
            }
            this.step();
        }

        public world: any;
        public BOX2D: any;

        public msg: string;
        public interval: any;
        public fieldController: Controller.FieldController;

        public receiveMessage(msg: string, socket: any) {
            this.msg = msg;
        }

        public gameTick = 0;


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


        private step() {
            var timeStep = 1.0 / 60;
            var iteration = 1;
            this.world.Step(timeStep, iteration);
            setTimeout(()=> {

                this.fieldController.players.forEach((entity: Entities.PlayerEntity)=> {
                    entity.setPosition(entity.body.m_xf.position);
                    // console.log(entity.position);
                });


                this.fieldController.entities.forEach((entity: Entities.GameEntity)=> {
                    entity.setPosition(entity.body.m_xf.position);

                });


                this.step();
            }, 10);
        }


        private createBall() {
            let ball = new Entities.GameEntity();

            ball.setPosition(new Helper.Point(Helper.Core.getRandomInt(-1000, 1000), Helper.Core.getRandomInt(-1000, 1000)));
            ball.id = this.fieldController.getNextEntityId();
            ball.key = ball.id.toString();
            // ball.body.ApplyForce(new this.BOX2D.b2Vec2(50, 0), ball.body.GetWorldCenter());

            this.fieldController.addEntity(ball);
        }


    }
}
