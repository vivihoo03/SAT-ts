/**
 * @param {Vector=} pos A vector representing the origin of the polygon. (all other
 *   points are relative to this one)
 * @param {Array.<Vector>=} points An array of vectors representing the points in the polygon,
 *   in counter-clockwise order.
 * @constructor
 */
import Vector from './vector';
export default class Polygon {
    pos: Vector;
    angle: number;
    offset: Vector;
    points: Array<Vector>;
    calcPoints: Array<Vector>;
    edges: Array<Vector>;
    normals: Array<Vector>;
    constructor(pos?: Vector, points?: Array<Vector>);
    /**
     * @param {Array.<Vector>=} points An array of vectors representing the points in the polygon,
     *   in counter-clockwise order.
     * @return {Polygon} This for chaining.
     */
    setPoints(points: Array<Vector>): Polygon;
    /**
     * @return {Polygon} This for chaining.
     */
    private _recalc;
    /**
     * @param {number} angle The current rotation angle (in radians).
     * @return {Polygon} This for chaining.
     */
    setAngle(angle: number): Polygon;
    /**
     * @param {Vector} offset The new offset vector.
     * @return {Polygon} This for chaining.
     */
    setOffset(offset: Vector): Polygon;
    /**
     * @param {number} angle The angle to rotate (in radians)
     * @return {Polygon} This for chaining.
     */
    rotate(angle: number): Polygon;
    /**
     * @param {number} x The horizontal amount to translate.
     * @param {number} y The vertical amount to translate.
     * @return {Polygon} This for chaining.
     */
    translate(x?: number, y?: number): Polygon;
    /**
     * @return {Polygon} The AABB
     */
    getAABB(): Polygon;
    /**
     * @return {Vector} A Vector that contains the coordinates of the Centroid.
     */
    getCentroid(): Vector;
}
