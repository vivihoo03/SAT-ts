import Vector from './vector';
import Polygon from './polygon';
export default class Box {
    /**
     * @param {Vector=} pos A vector representing the bottom-left of the box (i.e. the smallest x and smallest y value).
     * @param {?number=} w The width of the box.
     * @param {?number=} h The height of the box.
     * @constructor
     */
    constructor(pos?: Vector, w?: number, h?: number);
    pos: Vector;
    w: number;
    h: number;
    /**
     * @return {Polygon} A new Polygon that represents this box.
     */
    toPolygon(): Polygon;
}
