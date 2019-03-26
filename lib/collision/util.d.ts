import { Vector } from '../math';
import Response from './response';
import { Circle } from '../index';
import Polygon from '../math/polygon';
/**
 * @param {Vector} aPos The position of the first polygon.
 * @param {Vector} bPos The position of the second polygon.
 * @param {Array.<Vector>} aPoints The points in the first polygon.
 * @param {Array.<Vector>} bPoints The points in the second polygon.
 * @param {Vector} axis The axis (unit sized) to test against.  The points of both polygons
 *   will be projected onto this axis.
 * @param {Response=} response A Response object (optional) which will be populated
 *   if the axis is not a separating axis.
 * @return {boolean} true if it is a separating axis, false otherwise.  If false,
 *   and a response is passed in, information about how much overlap and
 *   the direction of the overlap will be populated.
 */
export declare function isSeparatingAxis(aPos: Vector, bPos: Vector, aPoints: Array<Vector>, bPoints: Array<Vector>, axis: Vector, response: Response): boolean;
/**
 * @param {Vector} p The point to test.
 * @param {Circle} c The circle to test.
 * @return {boolean} true if the point is inside the circle, false if it is not.
 */
export declare function pointInCircle(p: Vector, c: Circle): boolean;
/**
 * @param {Polygon} a The first polygon.
 * @param {Polygon} b The second polygon.
 * @param {Response=} response Response object (optional) that will be populated if
 *   they interset.
 * @return {boolean} true if they intersect, false if they don't.
 */
export declare function testPolygonPolygon(a: Polygon, b: Polygon, response: Response): boolean;
/**
 * @param {Vector} p The point to test.
 * @param {Polygon} poly The polygon to test.
 * @return {boolean} true if the point is inside the polygon, false if it is not.
 */
export declare function pointInPolygon(p: Vector, poly: Polygon): boolean;
/**
 * @param {Circle} a The first circle.
 * @param {Circle} b The second circle.
 * @param {Response=} response Response object (optional) that will be populated if
 *   the circles intersect.
 * @return {boolean} true if the circles intersect, false if they don't.
 */
export declare function testCircleCircle(a: Circle, b: Circle, response: Response): boolean;
/**
 * @param {Polygon} polygon The polygon.
 * @param {Circle} circle The circle.
 * @param {Response=} response Response object (optional) that will be populated if
 *   they interset.
 * @return {boolean} true if they intersect, false if they don't.
 */
export declare function testPolygonCircle(polygon: Polygon, circle: Circle, response: Response): boolean;
/**
 * @param {Circle} circle The circle.
 * @param {Polygon} polygon The polygon.
 * @param {Response=} response Response object (optional) that will be populated if
 *   they interset.
 * @return {boolean} true if they intersect, false if they don't.
 */
export declare function testCirclePolygon(circle: Circle, polygon: Polygon, response: Response): boolean;
