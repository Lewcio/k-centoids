import {Point} from './point';

export class Centroid implements Point {
  x: number;
  y: number;

  constructor(point: Point) {
    this.x = point.x;
    this.y = point.y;
  }
}
