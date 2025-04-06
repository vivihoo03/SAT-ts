import Box from './box';
import Polygon from './polygon';
import Vector from './vector';
export default class Circle {
    type: 'circle';
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
    /**
     * @return {Polygon} The AABB
     */
    getAABBBox(): Box;
    toPolygon(): Polygon;
}
