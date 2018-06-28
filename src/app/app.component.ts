import {Component} from '@angular/core';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  points: number[][] = [
    [4, -3],
    [4, -2],
    [-3, 1]
  ];
  centroids: number[][];
  centroidPoints: number[][][];

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
      const newCentroid: number[] = this.findFarthestPoint(this.points, this.findBiggestPoint(this.points));
      if (!this.centroids.includes(newCentroid)) {
        this.centroids.push(newCentroid);
        this.centroidPoints = this.getCentroids(this.points, this.centroids);
      }
    }
  }

  getCentroids(points: number[][], centroids: number[][]): number[][][] {
    // let centroidPoints: number[centroids.length][];
    console.log(points);
    // console.log(centroids);
    let centroidPoints: number[][][];
    // expand to have corrent number of arrays
    centroids.forEach(function (n, index) {
      if (index === 0) {
        centroidPoints = [];
      } else {
        centroidPoints.push([]);
      }
    });
    points.forEach((point: number[]) => {
      let closest = 0;
      centroids.forEach((centroid: number[], centroidIndex) => {
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
        centroidPoints[closest].push([point[0], point[1]]);
      }


    });
    console.log(centroidPoints);
    return centroidPoints;
  }

  addPoint(inputX: HTMLInputElement, inputY: HTMLInputElement): boolean {
    const newPoint: number[] = [+inputX.value, +inputY.value];
    if (this.points == null) {
      this.points = [newPoint];
    } else {
      // if nie dziala :(
      if (!this.points.includes(newPoint)) {
        this.points.push(newPoint);
      }
    }
    this.updateMatrix(this.points);
    return false;
}

  findBiggestPoint(points: number[][]): number[] {
    let biggestPair = [0, 0];
    points.forEach(point => {
      if (Math.abs(point[0]) + Math.abs(point[1]) > Math.abs(biggestPair[0]) + Math.abs(biggestPair[1])) {
        biggestPair = point;
      }
    });
    return biggestPair;
  }

  findFarthestPoint(points: number[][], start: number[]): number[] {
    let farthestPoint: number[] = start;
    points.forEach(point => {
      if (Math.abs(start[0] - point[0]) + Math.abs(start[1] - point[1])) {
        farthestPoint = point;
      }
    });
    return farthestPoint;
  }

  distance(point1: number[], point2: number[]): number {
    return Math.abs(point2[0] - point1[0]) + Math.abs(point2[1] - point1[1]);
  }

  updateMatrix(points: number[][]): number[] {
    const result = [0, 0, 0, 0];
    points.forEach(point => {
      if (point[0] > result[0]) { result[0] = point[0]; }
      if (point[0] < result[1]) { result[1] = point[0]; }
      if (point[1] > result[2]) { result[2] = point[1]; }
      if (point[1] < result[3]) { result[3] = point[1]; }
    });
    return result;
  }
}
