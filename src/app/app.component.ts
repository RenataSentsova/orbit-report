import { Component } from '@angular/core';
import {Satellite} from './info/satellite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sourceList: Satellite[];
  displayList: Satellite[];

  constructor() {
    this.displayList = [];
    this.sourceList = [];
    const satellitesUrl = 'https://handlers.education.launchcode.org/static/satellites.json';

    window.fetch(satellitesUrl).then(function(response) {
      response.json().then(function(data) {
        const fetchedSatellites = data.satellites;
        if (fetchedSatellites.length) {
          fetchedSatellites.forEach(({ name, type, launchDate, orbitType, operational }) => {
            this.sourceList.push(new Satellite(name, type, launchDate, orbitType, operational));
          });
        } else {
          alert('Error: no data');
        }
        this.displayList = this.sourceList.slice(0);
      }.bind(this));
    }.bind(this));

  }

  search(searchTerm: string): void {
    const matchingSatellites: Satellite[] = [];
    searchTerm = searchTerm.toLowerCase();
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.sourceList.length; i++) {
      const name = this.sourceList[i].name.toLowerCase();
      if (name.indexOf(searchTerm) >= 0) {
        matchingSatellites.push(this.sourceList[i]);
      }
    }
    // assign this.displayList to be the the array of matching satellites
    // this will cause Angular to re-make the table, but now only containing matches
    this.displayList = matchingSatellites;
  }
}
