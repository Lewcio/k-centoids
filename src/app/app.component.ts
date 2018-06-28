import {Component} from '@angular/core';
import {Point} from './point';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  points: Point[] = [
    new Point(4, -3),
    new Point(4, -2),
    new Point(-3, 1)
  ];
  centroids: Point[];
  centroidPoints: Point[][];

  // [x - from, x - to, y - from, y - to]
  matrix: number[] = [0, 0, 0, 0];

  constructor() {
    this.matrix = this.updateMatrix(this.points);
    console.log(this.range(-3, 5));
    // console.log(this.distance(this.points[0], this.points[1]));
    // console.log(this.distance(this.points[1], this.points[0]));
    // console.log(this.distance(this.points[2], this.points[0]));
    // console.log('Points' + this.points);
    // console.log('Biggest point' + this.findBiggestPoint(this.points));
    // console.log('Farthest point from biggest' + this.findFarthestPoint(this.points, this.findBiggestPoint(this.points)));
    // this.matrix = this.updateMatrix(this.points);
    // console.log('Matrix' + this.matrix);

  }

  range(from: number, to: number): number[] {
    let tab: number[] = [];
    for (let i = from; i < to; i++) {
      tab.push(i);
    }
    return tab;
  }

  // trackByRangeX(index: number, matrix: number[]) {
  //   return this.rangeX;
  // }
  // trackByRangeY(index: number, matrix: number[]) {
  //   return this.rangeY;
  // }

  addCentroid() {
    if (this.centroids == null) {
      this.centroids = [this.findBiggestPoint(this.points)];
    } else {
      const newCentroid: Point = this.findFarthestPoint(this.points, this.findBiggestPoint(this.points));
      if (!this.centroids.includes(newCentroid)) {
        this.centroids.push(newCentroid);
        this.centroidPoints = this.getCentroids(this.points, this.centroids);
      }
    }
  }

  getCentroids(points: Point[], centroids: Point[]): Point[][] {
    // let centroidPoints: number[centroids.length][];
    console.log(points);
    // console.log(centroids);
    let centroidPoints: Point[][];
    // expand to have corrent number of arrays
    centroids.forEach(function (n, index) {
      if (index === 0) {
        centroidPoints = [];
      } else {
        centroidPoints.push([]);
      }
    });
    points.forEach((point: Point) => {
      let closest = 0;
      centroids.forEach((centroid: Point, centroidIndex) => {
        if (this.distance(point, centroid) <= this.distance(point, centroids[closest])) {
          closest = centroidIndex;
          // console.log('point' + point);
          // console.log('centroid current' + centroid);
          // console.log('centroid closest' + centroids[closest]);
          // console.log(closest);
          // console.log();
        }
      });
      // najblizszy centroid otrzumuje punkt
      if (centroidPoints[closest] == null) {
        centroidPoints[closest] = [point];
      } else {
        centroidPoints[closest].push(point);
      }


    });
    console.log(centroidPoints);
    return centroidPoints;
  }

  addPoint(inputX: HTMLInputElement, inputY: HTMLInputElement): boolean {
    const newPoint = new Point(+inputX.value, +inputY.value);
    if (this.points == null) {
      this.points = [newPoint];
    } else {
      // if nie dziala :(
      if (!this.points.includes(newPoint)) {
        this.points.push(newPoint);
      }
    }
    this.updateMatrix(this.points);
    if (this.centroids.length > 0) {
      this.centroidPoints = this.getCentroids(this.points, this.centroids);
    }
    return false;
}

  findBiggestPoint(points: Point[]): Point {
    let biggest = new Point(0, 0);
    points.forEach(point => {
      if (Math.abs(point.x) + Math.abs(point.y) > Math.abs(biggest.x) + Math.abs(biggest.y)) {
        biggest = point;
      }
    });
    return biggest;
  }

  findFarthestPoint(points: Point[], start: Point): Point {
    let farthestPoint: Point = start;
    points.forEach(point => {
      if (Math.abs(start.x - point.x) + Math.abs(start.y - point.y)) {
        farthestPoint = point;
      }
    });
    return farthestPoint;
  }

  distance(point1: Point, point2: Point): number {
    return Math.abs(point2.x - point1.x) + Math.abs(point2.y - point1.y);
  }

  updateMatrix(points: Point[]): number[] {
    const result = [0, 0, 0, 0];
    points.forEach(point => {
      if (point.x > result[0]) { result[0] = point.x; }
      if (point.x < result[1]) { result[1] = point.x; }
      if (point.y > result[2]) { result[2] = point.y; }
      if (point.y < result[3]) { result[3] = point.y; }
    });
    return result;
  }
}
