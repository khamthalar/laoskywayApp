import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DepartureItemsComponent } from '../departure-items/departure-items.component';

@Component({
  selector: 'app-select-class',
  templateUrl: './select-class.component.html',
  styleUrls: ['./select-class.component.css']
})
export class SelectClassComponent implements OnInit {

  @ViewChild('depart') depart:DepartureItemsComponent;

  customer_search_value:any;

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

    this.customer_search_value = this.router.getCurrentNavigation().extras.state.cus_input;

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
    // this.departures = obj_depart;
    this.returns = obj_returns;
    this.depart.departures = obj_depart;

    this.depart.cityPair=this.cityPair;
  
    this.depart.default_depart=this.default_depart;
    this.depart.default_arrival=this.default_arrival;
  
    this.depart.default_depart_airport=this.default_depart_airport;
    this.depart.default_arrival_airport=this.default_arrival_airport;
  }
  back() {
    this.router.navigate(["bookflight"],{ state: {data:this.customer_search_value} });
  }

}
