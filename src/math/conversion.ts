import Polygon from "./polygon";
import Vector from "./vector";
import Box from "./box";
import Circle from "./circle";

export function convertBoxToPolygon(box: {pos: {x: number, y: number}, w: number, h: number}){
    return new Polygon(new Vector(box.pos.x, box.pos.y),[
        new Vector(), new Vector(box.w, 0),
        new Vector(box.w, box.h), new Vector(0,box.h)
    ]);
}

export function getAABBBox(polygon: {pos: {x: number, y: number}, calcPoints?: {x: number, y: number}[], r?: number}){
    if(polygon.r){
        let r = polygon.r;
        let corner = new Vector(polygon.pos.x - r, polygon.pos.y - r);
        return new Box(corner, r*2, r*2);
    }
    let points = polygon.calcPoints;
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
        } 
        if(point['y']<yMin){
            yMin = point['y'];
        } else if(point['y']>yMax){
            yMax = point['y'];
        };
    };
    const pos = {x: polygon.pos.x + xMin, y: polygon.pos.y + yMin};
    return new Box(new Vector(pos.x, pos.y), xMax - xMin, yMax - yMin);
}