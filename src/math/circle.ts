import Vector from './vector';
import Box from './box';
import Polygon from './polygon';

export default class Circle{
    pos: Vector;

    r: number;

  // ## Circle
  //
  // Represents a circle with a position and a radius.

  // Create a new circle, optionally passing in a position and/or radius. If no position
  // is given, the circle will be at `(0,0)`. If no radius is provided, the circle will
  // have a radius of `0`.
  /**
   * @param {Vector=} pos A vector representing the position of the center of the circle
   * @param {?number=} r The radius of the circle
   * @constructor
   */
    constructor(pos:Vector = new Vector(),r:number = 0){
        this.pos = pos;

        this.r = r;
    };

    // Compute the axis-aligned bounding box (AABB) of this Circle.
    //
    // Note: Returns a _new_ `Polygon` each time you call this.
    /**
     * @return {Polygon} The AABB
     */
    getAABB():Polygon{
        let r = this.r;
        let corner = this.pos.clone().sub(new Vector(r,r));
        return new Box(corner, r*2, r*2).toPolygon();
    };

    // Compute the axis-aligned bounding box (AABB) of this Circle.
    //
    // Note: Returns a _new_ `Polygon` each time you call this.
    /**
     * @return {Polygon} The AABB
     */
    getAABBBox():Box{
        let r = this.r;
        let corner = this.pos.clone().sub(new Vector(r,r));
        return new Box(corner, r*2, r*2);
    };
};
