/// <reference path="../../src/Entities/GameEntity.ts" />
namespace Conroller {
    export class FieldViewController {

        public scene: Client.GameScene;
        public worldContainer: PIXI.Container;
        public entities: any = {};
        public ids: number[] = [];
        public entityViews: any = {};

        /**
         * Create GameEntity based on message from server
         * @param msg
         */
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

                entity.time = Number(entityParams[4]);

                this.entities[entityParams[0]] = entity;
                this.ids.push(Number(entityParams[0]));
            });
            this.syncPosition();
        }

        public syncPosition() {
            this.ids.forEach((entityId)=> {
                let serverEntityDesc = this.entities[entityId];

                if (!this.entityViews[entityId]) {

                    if (serverEntityDesc.type != Server.Config.ENTITY_TYPES.CANDY_ENTITY) {
                        /**
                         * Create Player Entity
                         */
                        this.entityViews[entityId] = this.createEntityView('bunny', serverEntityDesc);
                        this.entityViews[entityId].setScale(0.5);

                        if (serverEntityDesc.type == Server.Config.ENTITY_TYPES.PLAYER_ENTITY) {
                            /**
                             * Set Current Player
                             */

                            this.scene.setPlayer(this.entityViews[entityId]);
                        }

                    } else {
                        this.entityViews[entityId] = this.createEntityView('tad', serverEntityDesc);
                    }
                } else {

                    /**
                     * Begin move
                     */
                    this.entityViews[entityId].targetPosition = serverEntityDesc.position;
                    this.entityViews[entityId].activeMove = true;

                }


            });
        }

        public createEntityView(name: string, gameEntity: any) {
            let entityView = new Client.GameEntityView();
            entityView.id = gameEntity.id;
            entityView.type = gameEntity.type;
            if (gameEntity.type == Server.Config.ENTITY_TYPES.PLAYER_ENTITY) {
                entityView.delta = new Date().getTime() - gameEntity.time;
                console.log(entityView.delta);
            }

            entityView.time = gameEntity.time;
            entityView.setName(name);
            entityView.setStage(this.worldContainer);
            entityView.initialize();
            entityView.setPosition(gameEntity.position);

            return entityView;
        }

        delegateWorldContainer(world: PIXI.Container) {
            this.worldContainer = world;
        }


        setScene(gameScene: Client.GameScene) {
            this.scene = gameScene;
        }
    }

}
