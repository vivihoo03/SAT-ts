import Polygon from "./polygon";
import Box from "./box";
export declare function convertBoxToPolygon(box: {
    pos: {
        x: number;
        y: number;
    };
    w: number;
    h: number;
}): Polygon;
export declare function getAABBBox(polygon: {
    pos: {
        x: number;
        y: number;
    };
    calcPoints?: {
        x: number;
        y: number;
    }[];
    r?: number;
}): Box;
