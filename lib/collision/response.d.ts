import { Box, Circle, Polygon, Vector } from "../math/index";
export default class Response {
    /**
     * @constructor
     */
    constructor();
    a: Polygon | Circle | Box;
    b: Polygon | Circle | Box;
    overlapN: Vector;
    overlapV: Vector;
    aInB: boolean;
    bInA: boolean;
    overlap: number;
    clear(): void;
}
