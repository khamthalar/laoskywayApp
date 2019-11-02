import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-class',
  templateUrl: './select-class.component.html',
  styleUrls: ['./select-class.component.css']
})
export class SelectClassComponent implements OnInit {
  data: any;
  cityPair: string;

  departures: any;
  returns: any;

  default_depart: string;
  default_arrival: string;

  default_depart_airport: string;
  default_arrival_airport: string;

  constructor(private router: Router) {
    this.data = this.router.getCurrentNavigation().extras.state.data;
    this.cityPair = this.router.getCurrentNavigation().extras.state.cityPair;

    this.default_depart = this.router.getCurrentNavigation().extras.state.depart;
    this.default_arrival = this.router.getCurrentNavigation().extras.state.arrival;

    this.default_depart_airport= this.router.getCurrentNavigation().extras.state.depart_name;
    this.default_arrival_airport= this.router.getCurrentNavigation().extras.state.arrival_name;
  }

  ngOnInit() {
    let obj_depart = [];
    let obj_returns = [];


    this.data.forEach(element => {
      if (element.cityPair.identifier == this.cityPair) {
        obj_depart.push(element);
      } else {
        obj_returns.push(element);
      }
    });
    this.departures = obj_depart;
    this.returns = obj_returns;
  }
  back() {
    this.router.navigate(["bookflight"]);
  }

}
