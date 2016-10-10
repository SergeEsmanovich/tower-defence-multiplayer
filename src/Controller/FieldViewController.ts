/// <reference path="../../src/Entities/GameEntity.ts" />
namespace Conroller {
    export class FieldViewController {


        public player:Client.GameEntityView;

        public scene:Client.GameScene;


        public worldContainer: PIXI.Container;
        public entities: any = {};
        public ids: number[] = [];
        public entityViews: any = {};

        public parseMessageFromServer(msg: string) {
            let data: any[] = msg.split('|');
            this.entities = {};
            this.ids = [];
            data.forEach((entityDesc: string)=> {
                let entityParams = entityDesc.split(',');
                let entity = new Entities.GameEntity();
                entity.id = Number(entityParams[0]);
                entity.type = Number(entityParams[1]);
                entity.position.x = ~~Number(entityParams[2]);
                entity.position.y = ~~Number(entityParams[3]);
                this.entities[entityParams[0]] = entity;
                this.ids.push(Number(entityParams[0]));
            });
            this.sincPosition();
        }

        public sincPosition() {
            this.ids.forEach((entityId)=> {
                let serverEntityDesc = this.entities[entityId];
                let entityView: Client.GameEntityView = null;

                if (!this.entityViews[entityId]) {

                    if (serverEntityDesc.type === Server.Config.ENTITY_TYPES.PLAYER_ENTITY) {
                        entityView = new Client.GameEntityView();
                        entityView.id = serverEntityDesc.id;
                        entityView.type = serverEntityDesc.type;
                        entityView.setName('bunny');
                        entityView.setStage(this.worldContainer);
                        entityView.initialize(serverEntityDesc.position);
                        entityView.setScale(0.5);
                        entityView.targetPosition = new Helper.Point(1000,1000);
                        entityView.activeMove = true;
                        this.worldContainer.addChild(entityView.view);
                        // console.log('new player');
                        this.entityViews[entityId] = entityView;



                        this.scene.setPlayer(this.entityViews[entityId]);

                    } else {
                        entityView = new Client.GameEntityView();
                        entityView.id = serverEntityDesc.id;
                        entityView.type = serverEntityDesc.type;
                        entityView.setName('tad');
                        entityView.setStage(this.worldContainer);

                        entityView.initialize(serverEntityDesc.position);
                        this.worldContainer.addChild(entityView.view);
                        // console.log('new');
                        this.entityViews[entityId] = entityView;
                    }
                } else {
                    entityView = this.entityViews[entityId];
                    // console.log('old');
                }
                if (entityView) {
                    entityView.targetPosition = serverEntityDesc.position;
                    entityView.activeMove = true;
                    // entityView.setPosition(serverEntityDesc.position);
                    console.log(this.ids.length);
                } else {
                    console.log('not found entity');
                }

            });
        }

        delegateWorldContainer(world: PIXI.Container) {
            this.worldContainer = world;
        }



        setScene(gameScene: Client.GameScene) {
            this.scene = gameScene;
        }
    }

}
