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
    console.log(this.points);
    console.log(this.centroids);
    console.log(this.centroidPoints);
    console.log(this.matrix);
    // console.log(this.range(this.matrix[2], this.matrix[3]));
  }

  range(from: number, to: number): number[] {
    let tab: number[] = [];
    for (let i = from; i < to; i++) {
      tab.push(i);
    }
    return tab;
  }

  ngOnInit() {
  }

}
