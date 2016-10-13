/// <reference path="../../src/Entities/GameEntity.ts" />
/// <reference path="../../src/Helper/Collection.ts" />
namespace Conroller {
    export class FieldViewController {

        public scene: Client.GameScene;
        public worldContainer: PIXI.Container;
        public entities = new Helper.Collection();
        public entityViews = new Helper.Collection();

        /**
         * Create GameEntity based on message from server
         * @param msg
         */
        public parseMessageFromServer(msg: string) {
            let data: any[] = msg.split('|');

            this.entities = new Helper.Collection();

            data.forEach((entityDesc: string)=> {
                let entityParams = entityDesc.split(',');
                let entity = new Entities.GameEntity();
                entity.id = Number(entityParams[0]);
                entity.key = entityParams[0];
                entity.type = Number(entityParams[1]);
                entity.setPosition(new Helper.Point(~~Number(entityParams[2]), ~~Number(entityParams[3])));

                entity.time = Number(entityParams[4]);

                this.entities[entityParams[0]] = entity;
                this.ids.push(Number(entityParams[0]));
                this.entities.add(entity);
            });
            this.syncPosition();
        }

        public syncPosition() {

            this.entities.forEach((entity: Entities.GameEntity)=> {

                if (!this.entityViews.get(entity.key)) {

                    if (entity.type != Server.Config.ENTITY_TYPES.CANDY_ENTITY) {
                        /**
                         * Create Player Entity
                         */
                        this.entityViews[entityId] = this.createEntityView('bunny', serverEntityDesc);
                        this.entityViews[entityId].setScale(0.5);
                        let entityView = this.createEntityView('bunny', entity);
                        entityView.setScale(0.5);
                        this.entityViews.add(entityView);

                        if (entity.type == Server.Config.ENTITY_TYPES.PLAYER_ENTITY) {
                            /**
                             * Set Current Player
                             */

                            this.scene.setPlayer(this.entityViews[entityId]);
                            this.scene.setPlayer(entityView);
                        }

                    } else {
                        this.entityViews[entityId] = this.createEntityView('tad', serverEntityDesc);
                        let entityView = this.createEntityView('tad', entity);
                        this.entityViews.add(entityView);
                    }
                } else {

                    /**
                     * Begin move
                     * @var entityView Client.GameEntityView
                     */
                    let entityView = this.entityViews.get(entity.key);
                    entityView.setTargetPosition(entity.position);
                    entityView.activeMove = true;
                    // if(entityView.type == Server.Config.ENTITY_TYPES.PLAYER_ENTITY){
                    //     console.log(entityView);
                    // }
                    this.entityViews[entityId].targetPosition = serverEntityDesc.position;
                    this.entityViews[entityId].activeMove = true;

                }

                }
            });
        }

        public createEntityView(name: string, gameEntity: any) {
            let entityView = new Client.GameEntityView();
            entityView.id = gameEntity.id;
            entityView.key = gameEntity.id;
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
