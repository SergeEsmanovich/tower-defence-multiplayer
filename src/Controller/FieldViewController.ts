/// <reference path="../../src/Entities/GameEntity.ts" />
/// <reference path="../../src/Helper/Collection.ts" />
/// <reference path="../../src/Entities/PlayerEntityView.ts" />
namespace Conroller {
    export class FieldViewController {

        public scene: Client.GameScene;
        public worldContainer: PIXI.Container;
        public entities = new Helper.Collection();
        public entityViews = new Helper.Collection();
        public postProcessing = false;

        public mask: PIXI.Sprite;



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
                this.entities.add(entity);
            });

            this.syncPosition();
            this.postProcess();

        }

        public postProcess() {
            if (!this.postProcessing) {
                // this.postProcessing = true;
                // this.mask = PIXI.Sprite.fromImage('light.png');
                // this.mask.position = new PIXI.Point(0, 0);
                // this.mask.anchor.set(0.5);
                // this.mask.scale.set(10);
                // this.worldContainer.addChild(this.mask);
                // this.scene.player.setFlashLight(this.mask);
            }
        }

        public syncPosition() {
            this.entities.forEach((entity: Entities.GameEntity)=> {

                if (!this.entityViews.get(entity.key)) {

                    if (entity.type != Server.Config.ENTITY_TYPES.CANDY_ENTITY) {
                        /**
                         * Create Player Entity
                         */
                        let entityView = this.createPlayerView('player', entity);

                        this.entityViews.add(entityView);

                        if (entity.type == Server.Config.ENTITY_TYPES.PLAYER_ENTITY) {
                            /**
                             * Set Current Player
                             */

                            this.scene.setPlayer(entityView);
                        }

                    } else {
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
                    entityView.time = entity.time;
                    if (entityView.type == Server.Config.ENTITY_TYPES.PLAYER_ENTITY) {
                        entityView.deltaTime = new Date().getTime() - entity.time;
                        this.scene.gameInfo.setPing(entityView.deltaTime.toString());
                    }
                }
            });

            this.entityViews.forEach((entityView: Client.GameEntityView)=> {
                let entity = this.entities.get(entityView.key);
                if (!entity) {
                    entityView.notFoundedCount += 1;
                } else {
                    entityView.notFoundedCount = 0;
                }

                // console.log(entityView.notFoundedCount);

                if (entityView.notFoundedCount > 10) {
                    entityView.stage.removeChild(entityView.view);
                    this.entityViews.remove(entityView.key)
                }


            });


        }

        public createEntityView(name: string, gameEntity: Entities.GameEntity) {
            let entityView = new Client.GameEntityView();
            entityView.id = gameEntity.id;
            entityView.key = gameEntity.id.toString();
            entityView.type = gameEntity.type;
            if (gameEntity.type == Server.Config.ENTITY_TYPES.PLAYER_ENTITY) {
                entityView.delta = new Date().getTime() - gameEntity.time;
                // console.log(entityView.delta);
            }

            entityView.time = gameEntity.time;
            entityView.setName(name);
            entityView.setStage(this.worldContainer);
            entityView.initialize();
            entityView.setPosition(gameEntity.position);

            return entityView;
        }

        public createPlayerView(name: string, gameEntity: Entities.GameEntity) {
            let entityView = new Client.PlayerEntityView();
            entityView.id = gameEntity.id;
            entityView.key = gameEntity.id.toString();
            entityView.type = gameEntity.type;
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
