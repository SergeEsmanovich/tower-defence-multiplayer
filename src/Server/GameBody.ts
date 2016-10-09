namespace Server {
    import FieldController = Conroller.FieldController;
    export class GameBody {

        constructor(fieldController: FieldController) {
            this.fieldController = fieldController;
            this.buildWorld();

            this.interval = setInterval(()=> {
                this.update();
            }, 1000);
        }

        public msg: string;
        public interval: any;
        public fieldController: Conroller.FieldController;

        public receiveMessage(msg: string, socket: any) {
            console.log(socket.id);
            this.msg = msg;
        }

        public update() {

        }

        private buildWorld() {
            this.createWalls();
        }


        private createWalls() {
            for (let i = 0; i < 100; i++) {
                let wall = new Entities.GameEntity();
                wall.position.x = Helper.Core.getRandomInt(-1000,1000);
                wall.position.y = Helper.Core.getRandomInt(-1000,1000);
                wall.type = 1;
                wall.id = this.fieldController.getNextEntityId();
                this.fieldController.addEntity(wall);
            }
        }

    }
}