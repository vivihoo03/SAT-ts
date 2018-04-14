  // ## Polygon
  //
  // Represents a *convex* polygon with any number of points (specified in counter-clockwise order)
  //
  // Note: Do _not_ manually change the `points`, `angle`, or `offset` properties. Use the
  // provided setters. Otherwise the calculated properties will not be updated correctly.
  //
  // `pos` can be changed directly.

  // Create a new polygon, passing in a position vector, and an array of points (represented
  // by vectors relative to the position vector). If no position is passed in, the position
  // of the polygon will be `(0,0)`.
  /**
   * @param {Vector=} pos A vector representing the origin of the polygon. (all other
   *   points are relative to this one)
   * @param {Array.<Vector>=} points An array of vectors representing the points in the polygon,
   *   in counter-clockwise order.
   * @constructor
   */

   import Vector from './vector';
   import Box from './box';

   export default class Polygon{
       pos: Vector;

       angle: number;

       offset: Vector;

       points: Array<Vector>;

       calcPoints: Array<Vector>;

       edges: Array<Vector>;

       normals: Array<Vector>;

       constructor(pos:Vector = new Vector(), points:Array<Vector> = []){
           this.pos = pos;

           this.angle = 0;

           this.offset = new Vector();

           this.setPoints(points);
       };


        // Set the points of the polygon.
        //
        // Note: The points are counter-clockwise *with respect to the coordinate system*.
        // If you directly draw the points on a screen that has the origin at the top-left corner
        // it will _appear_ visually that the points are being specified clockwise. This is just
        // because of the inversion of the Y-axis when being displayed.
        /**
         * @param {Array.<Vector>=} points An array of vectors representing the points in the polygon,
         *   in counter-clockwise order.
         * @return {Polygon} This for chaining.
         */
       setPoints(points:Array<Vector>):Polygon{
           let lengthChanged = !this['points'] || this.points.length !== points.length;

           if(lengthChanged){
                let i;
                let calcPoints:any = this.calcPoints = [];
                let edges:any = this.edges = [];
                let normals:any = this.normals = [];
                // Allocate the vector arrays for the calculated properties
                for (i = 0; i < points.length; i++) {
                    calcPoints.push(new Vector());
                    edges.push(new Vector());
                    normals.push(new Vector());
                };
           };     
           this.points = points;
           this._recalc();
           return this;    
       };

        // Computes the calculated collision polygon. Applies the `angle` and `offset` to the original points then recalculates the
        // edges and normals of the collision polygon.
        /**
         * @return {Polygon} This for chaining.
         */
       private _recalc():Polygon{
           let calcPoints = this.calcPoints;

           let edges = this.edges;

           let normals = this.normals;

           let points = this.points;

           let offset = this.offset;

           let angle = this.angle;

           let len = points.length;

           let i;

           for(i = 0; i <len; i++){
               let calcPoint = calcPoints[i].copy(points[i]);
               calcPoint.x += offset.x;
               calcPoint.y += offset.y;
               if(angle !== 0){
                   calcPoint.rotate(angle);
               };
           };

           for(i = 0;i <len; i++){
               let p1 = calcPoints[i];
               let p2 = i < len-1 ? calcPoints[i+1] : calcPoints[0];
               let e = edges[i].copy(p2).sub(p1);
               normals[i].copy(e).perp().normalize();
           };

           return this;
       };

        // Set the current rotation angle of the polygon.
        /**
         * @param {number} angle The current rotation angle (in radians).
         * @return {Polygon} This for chaining.
         */
        setAngle(angle:number):Polygon{
            this.angle = angle;

            this._recalc();

            return this;
        };

        // Set the current offset to apply to the `points` before applying the `angle` rotation.
        /**
         * @param {Vector} offset The new offset vector.
         * @return {Polygon} This for chaining.
         */
        setOffset(offset:Vector):Polygon{
            this.offset = offset;
            
            this._recalc();

            return this;
        };

        // Rotates this polygon counter-clockwise around the origin of *its local coordinate system* (i.e. `pos`).
        //
        // Note: This changes the **original** points (so any `angle` will be applied on top of this rotation).
        /**
         * @param {number} angle The angle to rotate (in radians)
         * @return {Polygon} This for chaining.
         */
        rotate(angle:number):Polygon{
            let points = this.points;
            
            let len = points.length;

            for(var i = 0;i < len; i++){
                points[i].rotate(angle);
            };

            this._recalc();

            return this;
        };

        // Translates the points of this polygon by a specified amount relative to the origin of *its own coordinate
        // system* (i.e. `pos`).
        //
        // This is most useful to change the "center point" of a polygon. If you just want to move the whole polygon, change
        // the coordinates of `pos`.
        //
        // Note: This changes the **original** points (so any `offset` will be applied on top of this translation)
        /**
         * @param {number} x The horizontal amount to translate.
         * @param {number} y The vertical amount to translate.
         * @return {Polygon} This for chaining.
         */
        translate(x:number = 0, y:number = 0):Polygon{
            let points = this.points;

            let len = points.length;

            for(var i = 0; i<len; i++){
                points[i]['x'] += x;
                points[i]['y'] += y;
            };

            this._recalc();

            return this;
        };

        // Compute the axis-aligned bounding box. Any current state
        // (translations/rotations) will be applied before constructing the AABB.
        //
        // Note: Returns a _new_ `Polygon` each time you call this.
        /**
         * @return {Polygon} The AABB
         */
        getAABB():Polygon{
            let points = this.calcPoints;

            let len = points.length;

            let xMin = points[0]['x'];
            let yMin = points[0]['y'];
            let xMax = xMin;
            let yMax = yMin;

            for(var i =1; i<len; i++){
                let point = points[i];

                if(point['x']<xMin){
                    xMin = point['x'];
                } else if(point['x']>xMax){
                    xMax = point['x'];
                } else if(point['y']<yMin){
                    yMin = point['y'];
                } else if(point['y']>yMax){
                    yMax = point['y'];
                };
            };
            return new Box(this["pos"].clone().add(new Vector(xMin, yMin)), xMax - xMin, yMax - yMin);
        };

        // Compute the centroid (geometric center) of the polygon. Any current state
        // (translations/rotations) will be applied before computing the centroid.
        //
        // See https://en.wikipedia.org/wiki/Centroid#Centroid_of_a_polygon
        //
        // Note: Returns a _new_ `Vector` each time you call this.
        /**
         * @return {Vector} A Vector that contains the coordinates of the Centroid.
         */
        getCentroid():Vector{
            let points = this['calcPoints'];

            let len = points.length;

            let cx = 0;
            let cy = 0;
            let ar = 0;

            for(var i = 0; i < len; i++){
                let p1 = points[i];

                let p2 = i === len - 1 ? points[0] : points[i+1];

                var a = p1['x'] *p2['y'] - p1['y']*p2['x'];
                cx = (p1['x'] + p2['x']) * a;
                cy = (p1['y'] + p2['y']) * a;
                ar += a;
            };

            ar = ar * 3;
            cx = cx / ar;
            cy = cy / ar;
            
            return new Vector(cx, cy);
        };

   };
