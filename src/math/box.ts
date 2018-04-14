    import Vector from './vector';
    import Polygon from './polygon';
    // ## Box
    //
    // Represents an axis-aligned box, with a width and height.


    // Create a new box, with the specified position, width, and height. If no position
    // is given, the position will be `(0,0)`. If no width or height are given, they will
    // be set to `0`.
    export default class Box {
        
    /**
     * @param {Vector=} pos A vector representing the bottom-left of the box (i.e. the smallest x and smallest y value).
     * @param {?number=} w The width of the box.
     * @param {?number=} h The height of the box.
     * @constructor
     */
    constructor(pos:Vector = new Vector(), w:number = 0, h:number = 0){
        this.pos = pos;

        this.w = w;

        this.h = h;
    };

    pos: Vector;
    
    w: number;
    
    h: number;

    // Returns a polygon whose edges are the same as this box.
    /**
     * @return {Polygon} A new Polygon that represents this box.
     */
    toPolygon():Polygon{
        let pos = this.pos;
        let w = this.w;
        let h = this.h;

        return new Polygon(new Vector(pos.x, pos.y),[
            new Vector(), new Vector(w, 0),
            new Vector(w, h), new Vector(0,h)
        ]);
    };

};