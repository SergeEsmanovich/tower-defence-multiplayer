/// <reference path="../../src/Entities/GameEntity.ts" />
/// <reference path="../../src/Entities/PlayerEntity.ts" />
/// <reference path="../../src/Helper/Collection.ts" />
/// <reference path="../../src/Helper/Collision.ts" />
namespace Controller {
    import PlayerEntity = Entities.PlayerEntity;
    export class FieldController {

        constructor() {
            this.buildWorld();
        }

        public world: any;
        public BOX2D: any;

        public entities = new Helper.Collection();

        public players = new Helper.Collection();

        public collisionContainer = new Helper.CollisionContainer();

        private NextEntityId = 1;

        public playerTime: number;

        private buildWorld() {
            this.BOX2D = require('./lib/box2d/box2d');
            this.world = new this.BOX2D.b2World(new this.BOX2D.b2Vec2(0, 0), true);
        }


        public addPlayer(client: Controller.Client) {
            let player = new Entities.PlayerEntity();
            player.id = this.getNextEntityId();
            player.key = client.socketId;
            player.setClient(client);
            this.setupBox2dPlayer(player);
            player.BOX2D = this.BOX2D;
            this.players.add(player);
        }

        public findPlayer(playerId: string) {
            return this.players.get(playerId);
        }

        public addEntity(entity: Entities.GameEntity) {
            this.setupBox2dCircle(entity);
            // entity.body.ApplyForce(new this.BOX2D.b2Vec2(0, 200), entity.body.GetWorldCenter());
            this.entities.add(entity);
        }

        //should be moved to Game Entity Mob
        public setupBox2dCircle(entity: Entities.GameEntity) {
            entity.world = this.world;
            var fixtureDef = new this.BOX2D.b2FixtureDef();
            fixtureDef.shape = new this.BOX2D.b2CircleShape(entity.radius);
            fixtureDef.friction = 0.3;
            fixtureDef.restitution = 0.4;
            fixtureDef.density = 0.48;
            fixtureDef.driction = 0.3;
            var ballBd = new this.BOX2D.b2BodyDef();
            ballBd.type = this.BOX2D.b2Body.b2_dynamicBody;
            ballBd.position.Set(entity.position.x, entity.position.y);

            entity.body = this.world.CreateBody(ballBd);
            entity.body.CreateFixture(fixtureDef);
        }

        public setupBox2dPlayer(entity: Entities.GameEntity) {
            this.setupBox2dCircle(entity);
        }

        public createMessageForSend(id: string) {
            let message: string = '';

            this.players.forEach((player: Entities.PlayerEntity)=> {
                this.playerTime = player.clientTime;
                if (player.client.socketId != id) {
                    message += player.id + ',' + Server.Config.ENTITY_TYPES.OTHER_PLAYER_ENTITY + ',' + player.getPositionString() + ',' + (new Date().getTime() - this.playerTime) + '|';
                } else {
                    message += player.id + ',' + player.type + ',' + player.getPositionString() + ',' + this.playerTime + '|';
                }
            });


            this.entities.forEach((entity: Entities.GameEntity)=> {
                message += entity.id + ',' + entity.type + ',' + entity.getPositionString() + ',' + (new Date().getTime() - this.playerTime) + '|';
            });
            message = message.slice(0, -1);
            return message;
        }

        public getNextEntityId() {
            return this.NextEntityId++;
        }
    }
}
