namespace Server {
    import FieldController = Controller.FieldController;
    export class GameBody {

        constructor(fieldController: FieldController) {
            this.fieldController = fieldController;
            this.buildWorld();

            this.interval = setInterval(()=> {
                this.update();
            }, 5);

            // this.interval = setInterval(()=> {
            //     this.IINPC();
            // }, 10000);

        }

        public msg: string;
        public interval: any;
        public fieldController: Controller.FieldController;

        public receiveMessage(msg: string, socket: any) {
            console.log(socket.id);
            this.msg = msg;
        }

        public update() {
            this.fieldController.players.forEach((entity: Entities.PlayerEntity)=> {
                entity.stepToPoint();
            });

            this.fieldController.entities.forEach((entity: Entities.GameEntity)=> {
                entity.stepToPoint();
            });
        }

        public IINPC() {
            this.fieldController.entities.forEach((entity: Entities.GameEntity)=> {
                entity.targetPosition = new Helper.Point(Helper.Core.getRandomInt(-1000, 1000), Helper.Core.getRandomInt(-1000, 1000))
                entity.activeMove = true;
            });
        }

        private buildWorld() {
            this.createWalls();
        }


        private createWalls() {
            for (let i = 0; i < 100; i++) {
                let wall = new Entities.GameEntity();
                wall.position.x = Helper.Core.getRandomInt(-1000, 1000);
                wall.position.y = Helper.Core.getRandomInt(-1000, 1000);
                wall.id = this.fieldController.getNextEntityId();
                this.fieldController.addEntity(wall);
            }
        }

    }
}
