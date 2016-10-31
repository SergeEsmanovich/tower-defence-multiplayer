namespace Server {
    import FieldController = Controller.FieldController;
    export class GameBody {

        constructor(fieldController: FieldController) {
            this.fieldController = fieldController;
            this.buildWorld();

            this.interval = setInterval(()=> {
                this.update();
            }, 1000 / 30);

            this.interval = setInterval(()=> {
                this.IINPC();
            }, 10000);

        }

        // public box2d = new

        public msg: string;
        public interval: any;
        public fieldController: Controller.FieldController;

        public receiveMessage(msg: string, socket: any) {
            // console.log(socket.id);
            this.msg = msg;
        }

        public gameTick = 0;

        public update() {
            this.gameTick++;

            this.fieldController.collisionContainer.reset();

            this.fieldController.players.forEach((entity: Entities.PlayerEntity)=> {
                this.fieldController.collisionContainer.add(entity);
                entity.stepToPoint();
            });

            this.fieldController.entities.forEach((entity: Entities.GameEntity)=> {
                this.fieldController.collisionContainer.add(entity);
                entity.stepToPoint();
            });
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
                    }else{
                        entity.activeMove = false;
                    }

                }


            });
        }

        private buildWorld() {
            this.createWalls();
        }


        private createWalls() {
            for (let i = 0; i < 100; i++) {
                let wall = new Entities.GameEntity();
                wall.position.x = Helper.Core.getRandomInt(-500, 500);
                wall.position.y = Helper.Core.getRandomInt(-500, 500);
                wall.id = this.fieldController.getNextEntityId();
                wall.key = wall.id.toString();
                this.fieldController.addEntity(wall);
            }
        }

    }
}
