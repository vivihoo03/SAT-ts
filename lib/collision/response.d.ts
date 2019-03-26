import { Vector } from "../math/index";
export default class Response {
    /**
     * @constructor
     */
    constructor();
    a: any;
    b: any;
    overlapN: Vector;
    overlapV: Vector;
    aInB: boolean;
    bInA: boolean;
    overlap: number;
    clear(): void;
}
