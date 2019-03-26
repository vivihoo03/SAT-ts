export default class Vector {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    /**
      * @param {Vector} other The other Vector.
      * @return {Vector} This for chaining.
      */
    copy(other: Vector): Vector;
    /**
     * @return {Vector} The new cloned vector
     */
    clone(): Vector;
    /**
     * @return {Vector} This for chaining.
     */
    perp(): Vector;
    /**
     * @param {number} angle The angle to rotate (in radians)
     * @return {Vector} This for chaining.
     */
    rotate(angle: number): Vector;
    /**
     * @return {Vector} This for chaining.
     */
    reverse(): Vector;
    /**
     * @return {Vector} This for chaining.
     */
    normalize(): Vector;
    /**
     * @param {Vector} other The other Vector.
     * @return {Vector} This for chaining.
     */
    add(other: {
        x: number;
        y: number;
    }): Vector;
    /**
     * @param {Vector} other The other Vector.
     * @return {Vector} This for chaiing.
     */
    sub(other: {
        x: number;
        y: number;
    }): Vector;
    /**
     * @param {number} x The scaling factor in the x direction.
     * @param {?number=} y The scaling factor in the y direction.  If this
     *   is not specified, the x scaling factor will be used.
     * @return {Vector} This for chaining.
     */
    scale(xs: number, ys?: number): this;
    /**
     * @param {Vector} other The vector to project onto.
     * @return {Vector} This for chaining.
     */
    project(other: Vector): Vector;
    /**
     * @param {Vector} other The unit vector to project onto.
     * @return {Vector} This for chaining.
     */
    projectN(other: Vector): Vector;
    /**
     * @param {Vector} axis The vector representing the axis.
     * @return {Vector} This for chaining.
     */
    reflect(axis: Vector): Vector;
    /**
     * @param {Vector} axis The unit vector representing the axis.
     * @return {Vector} This for chaining.
     */
    reflectN(axis: Vector): Vector;
    /**
     * @param {Vector}  other The vector to dot this one against.
     * @return {number} The dot product.
     */
    dot(other: Vector): number;
    /**
     * @return {number} The length^2 of this vector.
     */
    len2(): number;
    /**
     * @return {number} The length of this vector.
     */
    len(): number;
}
