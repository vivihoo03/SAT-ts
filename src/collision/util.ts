import {Vector, Box} from '../math';
import Response from './response';

// ## Object Pools

// A pool of `Vector` objects that are used in calculations to avoid
// allocating memory.
/**
 * @type {Array.<Vector>}
 */
let T_VECTORS:Array<Vector>  = [];

for (var i = 0; i < 10; i++) { T_VECTORS.push(new Vector()); }

// A pool of arrays of numbers used in calculations to avoid allocating
// memory.
/**
 * @type {Array.<Array.<number>>}
 */
let T_ARRAYS:Array<Array<number>> = [];

for (var i = 0; i < 5; i++) { T_ARRAYS.push([]); }

// Temporary response used for polygon hit detection.
/**
 * @type {Response}
 */
let T_RESPONSE = new Response(); 

// Tiny "point" polygon used for polygon hit detection.
/**
 * @type {Polygon}
 */
let TEST_POINT = new Box(new Vector(), 0.000001, 0.000001).toPolygon();


// ## Helper Functions

// Flattens the specified array of points onto a unit vector axis,
// resulting in a one dimensional range of the minimum and
// maximum value on that axis.
/**
 * @param {Array.<Vector>} points The points to flatten.
 * @param {Vector} normal The unit vector axis to flatten on.
 * @param {Array.<number>} result An array.  After calling this function,
 *   result[0] will be the minimum value,
 *   result[1] will be the maximum value.
 */

 function flattenPointsOn(points:Array<Vector>, normal:Vector, result:Array<number>) {
     let min = Number.MAX_VALUE;

     let max = -Number.MAX_VALUE;

     let len = points.length;

     for(var i = 0; i < len; i++){
         // The magnitude of the projection of the point onto the normal
         let dot = points[i].dot(normal);
         if(dot < min) min = dot;
         if(dot > max) max = dot;
     };
     result[0] = min;
     result[1] = max;
 }

 // Check whether two convex polygons are separated by the specified
// axis (must be a unit vector).
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
export function isSeparatingAxis(aPos:Vector, bPos: Vector, aPoints:Array<Vector>, bPoints: Array<Vector>, axis:Vector, response:Response): boolean{
    let rangeA = T_ARRAYS.pop();

    let rangeB = T_ARRAYS.pop();

    // The magnitude of the offset between the two polygons
    let offsetV = T_VECTORS.pop().copy(bPos).sub(aPos);
    let projectedOffset = offsetV.dot(axis);

    // Project the polygons onto the axis.
    flattenPointsOn(aPoints, axis, rangeA);
    flattenPointsOn(bPoints, axis, rangeB);

    // Move B's range to its position relative to A.
    rangeB[0] += projectedOffset;
    rangeB[1] += projectedOffset;

    if (rangeA[0] > rangeB[1] || rangeB[0] > rangeA[1]) {
        T_VECTORS.push(offsetV);
        T_ARRAYS.push(rangeA);
        T_ARRAYS.push(rangeB);
        return true;
    };

    // This is not a separating axis. If we're calculating a response, calculate the overlap.
    if(response){
        let overlap = 0;
        // A starts further left than B
        if(rangeA[0]<rangeB[0]){
            response['aInB'] = false;
            // A ends before B does. We have to pull A out of B
            if(rangeA[1]<rangeB[1]){
                overlap = rangeA[1] - rangeB[0];
                response['bInA'] = false;
                // B is fully inside A.  Pick the shortest way out.
            } else {
                let option1 = rangeA[1] - rangeB[0];
                let option2 = rangeB[1] - rangeA[0];
                overlap = option1 < option2 ? option1 : -option2;
            }
        } else {
            response['bInA'] = false;
            // B ends before A ends. We have to push A out of B
            if(rangeA[1] > rangeB[1]){
                overlap = rangeA[0] - rangeB[1];
                response ['aInB'] = false
            } else {
                // A is fully inside B.  Pick the shortest way out.
                var option1 = rangeA[1] - rangeB[0];
                var option2 = rangeB[1] - rangeA[0];
                overlap = option1 < option2 ? option1 : -option2;
            };
        }
        // If this is the smallest amount of overlap we've seen so far, set it as the minimum overlap.
        let absOverlap = Math.abs(overlap);
        if(absOverlap < response['overlap']){
            response['overlap'] = absOverlap;
            response['overlapN'].copy(axis);
            if (overlap < 0) {
                response['overlapN'].reverse();
            };
        };
    };
    T_VECTORS.push(offsetV);
    T_ARRAYS.push(rangeA);
    T_ARRAYS.push(rangeB);
    return false;
};

// Calculates which Voronoi region a point is on a line segment.
// It is assumed that both the line and the point are relative to `(0,0)`
//
//            |       (0)      |
//     (-1)  [S]--------------[E]  (1)
//            |       (0)      |
/**
 * @param {Vector} line The line segment.
 * @param {Vector} point The point.
 * @return  {number} LEFT_VORONOI_REGION (-1) if it is the left region,
 *          MIDDLE_VORONOI_REGION (0) if it is the middle region,
 *          RIGHT_VORONOI_REGION (1) if it is the right region.
 */