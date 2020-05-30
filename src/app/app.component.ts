import { Component } from '@angular/core';
import {Satellite} from './info/satellite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sourceList: Satellite[];

  constructor() {
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
      }.bind(this));
    }.bind(this));

  }
}
