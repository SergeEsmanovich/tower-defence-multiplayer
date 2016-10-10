/// <reference path="../../src/Entities/GameEntity.ts" />
namespace Conroller {
    export class FieldViewController {


        public player: Client.GameEntityView;

        public scene: Client.GameScene;


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

                entity.setPosition(new Helper.Point(~~Number(entityParams[2]), ~~Number(entityParams[3])));

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
                        entityView.initialize();
                        entityView.setScale(0.5);
                        entityView.setPosition(serverEntityDesc.position.clone());
                        entityView.setWorld(this.worldContainer);
                        this.worldContainer.addChild(entityView.view);

                        this.entityViews[entityId] = entityView;
                        this.scene.setPlayer(this.entityViews[entityId]);

                    } else {
                        entityView = new Client.GameEntityView();
                        entityView.id = serverEntityDesc.id;
                        entityView.type = serverEntityDesc.type;
                        entityView.setName('tad');
                        entityView.setStage(this.worldContainer);
                        entityView.initialize();
                        entityView.setPosition(serverEntityDesc.position.clone());
                        this.worldContainer.addChild(entityView.view);
                        this.entityViews[entityId] = entityView;
                    }
                } else {
                    this.entityViews[entityId].targetPosition = serverEntityDesc.position;
                    this.entityViews[entityId].activeMove = true;
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
