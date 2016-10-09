/// <reference path="../../src/Entities/GameEntity.ts" />
namespace Conroller {
    export class FieldViewController {
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
                entity.position.x = Number(entityParams[2]);
                entity.position.y = Number(entityParams[3]);
                this.entities[entityParams[0]] = entity;
                this.ids.push(Number(entityParams[0]));
            });
            this.sincPosition();
        }

        public sincPosition() {
            this.ids.forEach((entityId)=> {
                let serverEntityDesc = this.entities[entityId];
                let entityView:Client.GameEntityView;
                if (!this.entityViews[entityId]) {
                    entityView = new Client.GameEntityView();
                    console.log('new');
                } else {
                    entityView = this.entityViews[entityId];
                    console.log('old');
                }

                entityView.id = serverEntityDesc.id;
                entityView.type = serverEntityDesc.type;
                entityView.setStage(this.worldContainer);
                entityView.setName('tad');
                entityView.initialize();
                entityView.setPosition(serverEntityDesc.position);
                this.worldContainer.addChild(entityView.view);

                this.entityViews[entityId] = entityView;

            });
        }

        delegateWorldContainer(world: PIXI.Container) {
            this.worldContainer = world;
        }
    }

}