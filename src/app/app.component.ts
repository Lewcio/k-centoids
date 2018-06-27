import { Component } from '@angular/core';

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
  centroids: number[][] = [[]];

  // [x - from, x - to, y - from, y - to]
  matrix: number[] = [0, 0, 0, 0];


  constructor() {
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

  addCentroid() {
    if (this.centroids.length === 0) {
      this.centroids.push(this.findBiggestPoint(this.points));
    } else {
      this.centroids.push(this.findFarthestPoint(this.points, this.findBiggestPoint(this.points)));
    }
  }

  addPoint(inputX: HTMLInputElement, inputY: HTMLInputElement): boolean {
    this.points.push([+inputX.value, +inputY.value]);
    this.updateMatrix(this.points);
    return false;
}

  findBiggestPoint(points: number[][]): number[] {
    let biggestPair = [0, 0];
    points.forEach(function (point: number[]) {
      if (Math.abs(point[0]) + Math.abs(point[1]) > Math.abs(biggestPair[0]) + Math.abs(biggestPair[1])) {
        biggestPair = point;
      }
    });
    return biggestPair;
  }

  findFarthestPoint(points: number[][], start: number[]): number[] {
    let farthestPoint: number[] = start;
    points.forEach(function (point: number[]) {
      if (Math.abs(start[0] - point[0]) + Math.abs(start[1] - point[1])) {
        farthestPoint = point;
      }
    });
    return farthestPoint;
  }

  updateMatrix(points: number[][]): number[] {
    let result: number[] = [0, 0, 0, 0];
    points.forEach(function (point: number[]) {
      if (point[0] > result[0]) { result[0] = point[0]; }
      if (point[0] < result[1]) { result[1] = point[0]; }
      if (point[1] > result[2]) { result[2] = point[1]; }
      if (point[1] < result[3]) { result[3] = point[1]; }
    });
    return result;
  }
}
