import {Component, Input, OnInit} from '@angular/core';
import {Satellite} from '../info/satellite';

@Component({
  selector: 'app-orbit-counts',
  templateUrl: './orbit-counts.component.html',
  styleUrls: ['./orbit-counts.component.css']
})
export class OrbitCountsComponent implements OnInit {
  @Input() satellites: Satellite[];
  @Input() types: string[];

  constructor() {
  }

  ngOnInit() {
  }

  getCounts(type: string) {
    let count = 0;
    for (const satellite of this.satellites) {
      if (satellite.type === type) {
        count++;
      }
    }
    return count;
  }
}
