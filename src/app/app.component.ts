import {Component, OnInit} from '@angular/core';
import {Point} from './point';
import {Centroid} from './centroid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // points: Point[];
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
  }

  range(from: number, to: number): number[] {
    const tab: number[] = [];
    for (let i = from; i < to; i++) {
      tab.push(i);
    }
    return tab;
  }

  addCentroid() {
    if (this.centroids == null) {
      this.centroids = [new Centroid(this.findBiggestPoint(this.points))];
    } else {
      const newCentroid: Point = new Centroid(this.findFarthestPoint(this.points, this.findBiggestPoint(this.points)));
      if (!this.centroids.includes(newCentroid)) {
        this.centroids.push(newCentroid);
        this.centroidPoints = this.getCentroids(this.points, this.centroids);
      }
    }
  }

  getCentroids(points: Point[], centroids: Point[]): Point[][] {
    let centroidPoints: Point[][] = [[]];
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
        centroidPoints[closest] = [new Centroid(point)];
      } else {
        centroidPoints[closest].push(new Centroid(point));
      }


    });
    return centroidPoints;
  }

  updateCentroids() {
    if (this.centroidPoints != null) {
      for (let i = 0; i < this.centroidPoints.length; i++) {
        const sum = [0, 0];
        for (let j = 0; j < this.centroidPoints[i].length; j++) {
          sum[0] += this.centroidPoints[i][j].x;
          sum[1] += this.centroidPoints[i][j].y;
        }
        this.centroids[i].x = sum[0] / this.centroidPoints[i].length;
        this.centroids[i].y = sum[1] / this.centroidPoints[i].length;
      }
      this.centroidPoints = this.getCentroids(this.points, this.centroids);
    }
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
    inputX.value = '';
    inputY.value = '';
    if (this.centroids != null) {
      this.centroidPoints = this.getCentroids(this.points, this.centroids);
    }
    this.matrix = this.updateMatrix(this.points);
    return false;
}

  findBiggestPoint(points: Point[]): Point {
    let biggest = new Point(0, 0);
    if (points != null) {
      points.forEach(point => {
        if (Math.abs(point.x) + Math.abs(point.y) > Math.abs(biggest.x) + Math.abs(biggest.y)) {
          biggest = point;
        }
      });
    }
    return biggest;
  }

  findFarthestPoint(points: Point[], start: Point): Point {
    let farthestPoint: Point = start;
    if (points != null) {
      points.forEach(point => {
        if (Math.abs(start.x - point.x) + Math.abs(start.y - point.y)) {
          farthestPoint = point;
        }
      });
    }
    return farthestPoint;
  }

  distance(point1: Point, point2: Point): number {
    return Math.abs(point2.x - point1.x) + Math.abs(point2.y - point1.y);
  }

  updateMatrix(points: Point[]): number[] {
    const result = [0, 0, 0, 0];
    if (points != null) {
      points.forEach(point => {
        if (point.x > result[0]) { result[0] = point.x; }
        if (point.x < result[1]) { result[1] = point.x; }
        if (point.y > result[2]) { result[2] = point.y; }
        if (point.y < result[3]) { result[3] = point.y; }
      });
    }
    return result;
  }

  ngOnInit(): void {
    // this.matrix = this.updateMatrix(this.points);
  }
}
