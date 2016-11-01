// require('sat');
namespace Helper {
    export class CollisionContainer {

        constructor() {
            // var SAT = r
            // equire('sat');
            // this.circle = SAT.Circle;
            // this.vector = SAT.Vector;
        }

        public circle: any;
        public vector: any;

        public container: Entities.GameEntity[] = [];

        public add(entity: Entities.GameEntity) {
            this.getLength(entity);
            this.container.push(entity);

        }

        public reset() {
            this.container = [];
        }

        public getLength(entity: Entities.GameEntity) {
            this.container.forEach((item: Entities.GameEntity)=> {

                // let vector1 = new this.vector(0 - item.position.x, 0 - item.position.y);
                // let circle1 = new this.circle(vector1, item.radius);
                //
                // let vector2 = new this.vector(0 - entity.position.x, 0 - entity.position.y);
                // let circle2 = new this.circle(vector2, entity.radius);
                //
                // let collided = SAT.testCircleCircle(circle1, circle2);
                //
                // if (collided) {
                //     item.onCollision(entity);
                //     entity.onCollision(item);
                // }


                let length = entity.position.getLengthToPoint(item.position);
                if (item.radius + entity.radius + 10 > length) {
                    item.onCollision(entity);
                    entity.onCollision(item);
                }
            });
        }

    }
}
