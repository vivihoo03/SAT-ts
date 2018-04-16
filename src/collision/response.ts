import { Vector } from "../math/index";

export default class Response{
    // ## Response
    //
    // An object representing the result of an intersection. Contains:
    //  - The two objects participating in the intersection
    //  - The vector representing the minimum change necessary to extract the first object
    //    from the second one (as well as a unit vector in that direction and the magnitude
    //    of the overlap)
    //  - Whether the first object is entirely inside the second, and vice versa.
    /**
     * @constructor
     */
    constructor(){
        this.a = null;
        this.b = null;
        this.overlapN = new Vector();
        this.overlapV = new Vector();
        this.clear();
    };

    a: any;

    b: any;

    overlapN: Vector;

    overlapV: Vector;

    aInB: boolean;

    bInA: boolean;

    overlap: number;

    clear(){
        this.aInB = true;

        this.bInA = true;

        this.overlap = Number.MAX_VALUE;
    };
}