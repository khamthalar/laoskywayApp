import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router: Router) { }
  ngOnInit(): void {
    let departures = new Date();
    let returns = new Date(departures.getFullYear(), departures.getMonth(), departures.getDate() + 2);
    let booking_default_data = {
      departures_date: departures,
      returns_date: returns,
      departure_city: "--",
      departure_city_code: "",
      destination_city: "--",
      destination_city_code: "",
      child_num:0,
      infant_num:0,
      adult_num:1
    };
    this.router.navigate(["bookflight"], { state: {data:booking_default_data} });
    // this.router.navigate(["selectClass"]);
  }
}
