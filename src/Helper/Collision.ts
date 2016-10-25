namespace Helper {
    export class CollisionContainer {
        public container: Entities.GameEntity[] = [];

        public add(entity: Entities.GameEntity) {
            this.getLength(entity);
            this.container.push(entity);
        }

        public reset(){
            this.container = [];
        }

        public getLength(entity: Entities.GameEntity) {
            this.container.forEach((item: Entities.GameEntity)=> {
                let length = entity.position.getLengthToPoint(item.position);
                if (item.radius + entity.radius > length) {
                    item.onCollision(entity);
                    entity.onCollision(item);
                }
            });
        }

    }
}
