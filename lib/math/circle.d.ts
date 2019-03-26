import Vector from './vector';
import Polygon from './polygon';
export default class Circle {
    pos: Vector;
    r: number;
    /**
     * @param {Vector=} pos A vector representing the position of the center of the circle
     * @param {?number=} r The radius of the circle
     * @constructor
     */
    constructor(pos?: Vector, r?: number);
    /**
     * @return {Polygon} The AABB
     */
    getAABB(): Polygon;
}
