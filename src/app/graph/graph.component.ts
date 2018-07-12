import {Component, Input, OnInit} from '@angular/core';
import {Point} from '../point';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  @Input() points: Point[];
  @Input() centroids: Point[];
  @Input() centroidPoints: Point[][];
  @Input() matrix: number[];
  constructor() {
  }

  range(number1: number, number2: number, reverse: boolean = false): number[] {
    let tab: number[] = [];
    let tmp = 0;
    if (number1 > number2) {
      tmp = number1;
      number1 = number2;
      number2 = tmp;
    }
    for (let i = number1; i <= number2; i++) {
      tab.push(i);
    }
    if (reverse) {
      for (let i = 0; i < tab.length / 2; i++) {
        tmp = tab[i];
        tab[i] = tab[tab.length - i - 1];
        tab[tab.length - i - 1] = tmp;
      }
    }
    return tab;
  }

  existsPoint(points: Point[], x: number, y: number): boolean {
    points.forEach((point: Point) => {
      if (point.x === x && point.y === y) { return true; }
    });
    return false;
  }

  ngOnInit() {
    console.log(this.points);
  }

}
