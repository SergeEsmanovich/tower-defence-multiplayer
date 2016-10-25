namespace Helper {
    export class Edge {
        constructor(entityA: Entities.GameEntity, entityB: Entities.GameEntity) {
            this.entityA = entityA;
            this.entityB = entityB;
            this.getWeight();
        }

        public entityA: Entities.GameEntity;
        public entityB: Entities.GameEntity;
        public weight: number;

        getWeight() {
            this.weight = this.entityA.position.getLengthToPoint(this.entityB.position)
        }
    }
}
