import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-departure-items',
  templateUrl: './departure-items.component.html',
  styleUrls: ['./departure-items.component.css']
})
export class DepartureItemsComponent implements OnInit {

  cityPair: string;

  departures: any;

  default_depart: string;
  default_arrival: string;

  default_depart_airport: string;
  default_arrival_airport: string;

  constructor() { }

  ngOnInit() {
  }

}
