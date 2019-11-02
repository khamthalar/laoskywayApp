import { Component, OnInit } from '@angular/core';
import { ReturnCalendarComponent } from '../return-calendar/return-calendar.component';
import { MatDialog } from '@angular/material/dialog';
import { formatDate } from '@angular/common';
import { AirportsComponent } from '../airports/airports.component';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-bookflight',
  templateUrl: './bookflight.component.html',
  styleUrls: ['./bookflight.component.css']
})
export class BookflightComponent implements OnInit {

  constructor(public dialog: MatDialog, private http: HttpClient, private router: Router) { }
  months_text = ['ມັງກອນ', 'ກຸມພາ', 'ມີນາ', 'ເມສາ', 'ພຶດສະພາ', 'ມິຖຸນາ', 'ກໍລະກົດ', 'ສິງຫາ', 'ກັນຍາ', 'ຕຸລາ', 'ພະຈິກ', 'ທັນວາ'];
  days_text = ['ວັນອາທິດ', 'ວັນຈັນ', 'ວັນອັງຄານ', 'ວັນພຸດ', 'ວັນພະຫັດ', 'ວັນສຸກ', 'ວັນເສົາ'];
  departures_date: Date;
  returns_date: Date;
  departures_month: string;
  departures_day: string;

  adult_num: number = 1;
  child_num: number = 0;
  infant_num: number = 0;

  returns_month: string;
  returns_day: string;

  city: any; //defualt departure city
  send_city: any;

  city_pair: any;
  destination_airport: any;

  departure_city: string;
  departure_city_code: string;
  destination_city: string;
  destination_city_code: string;

  todayDate = new Date();
  tomorrow = new Date(this.todayDate.getFullYear(), this.todayDate.getMonth(), this.todayDate.getDate() + 2);

  travelOption_result: any;

  loading = false;

  // calendar dialog
  openDialog(): void {
    // open calendar popup
    const dialogRef = this.dialog.open(ReturnCalendarComponent, {
      data: { departures: this.departures_date, returns: this.returns_date },
    });

    // catch event popup closed
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

      this.departures_date = new Date(result.fromdate.year, result.fromdate.month - 1, result.fromdate.day);
      this.returns_date = new Date(result.todate.year, result.todate.month - 1, result.todate.day);

      // set date from popup
      this.departures_month = this.months_text[this.departures_date.getMonth()];
      this.departures_day = this.days_text[this.departures_date.getDay()];
      this.returns_month = this.months_text[this.returns_date.getMonth()];
      this.returns_day = this.days_text[this.returns_date.getDay()];
    });
  }


  selectAirport(data): void {
    // catch event select airport
    if (data == "depart") {
      // departure selected
      // config airport dialog
      this.send_city = { "action": "departure", "data": this.city }
      const airport_dialogRef = this.dialog.open(AirportsComponent, {
        maxWidth: '100vw',
        maxHeight: '100vh',
        height: '100%',
        width: '100%',
        data: this.send_city
      });
      airport_dialogRef.afterClosed().subscribe(result => {
        if (result.status == "selected") {
          if (result.city_name != this.departure_city) {
            this.departure_city = result.city_name;
            this.departure_city_code = result.city_code;
            this.destination_city = "--";
            this.destination_city_code = "";
          }
        }
      });

    } else {
      // arrival selected
      if (this.departure_city != "--") {
        let obj = [];
        this.city_pair.forEach(element => {
          if (element.departure.airport.name == this.departure_city) {
            obj.push(element.arrival.airport);
          }
        });
        this.destination_airport = obj;
        this.send_city = { "action": "arrival", "data": this.destination_airport }
        const airport_dialogRef = this.dialog.open(AirportsComponent, {
          maxWidth: '100vw',
          maxHeight: '100vh',
          height: '100%',
          width: '100%',
          data: this.send_city
        });
        airport_dialogRef.afterClosed().subscribe(result => {
          if (result.status == "selected") {
            this.destination_city = result.city_name;
            this.destination_city_code = result.city_code;
          }
        });

      }
    }
  }


  passenger_plus(data) {
    if (data == "adult") {
      if (this.adult_num + this.child_num < 9) {
        this.adult_num = this.adult_num + 1;
      }
    } else if (data == "child") {
      if (this.adult_num + this.child_num < 9) {
        this.child_num = this.child_num + 1;
      }
    } else if (data == "infant") {
      if (this.infant_num < this.adult_num) {
        this.infant_num = this.infant_num + 1;
      }
    }
  }

  passenger_minus(data) {
    if (data == "adult") {
      if (this.adult_num > 1) {
        this.adult_num = this.adult_num - 1;
        if (this.infant_num > this.adult_num) {
          this.infant_num = this.adult_num;
        }
      }
    } else if (data == "child") {
      if (this.child_num > 0) {
        this.child_num = this.child_num - 1;
      }
    } else if (data == "infant") {
      if (this.infant_num > 0) {
        this.infant_num = this.infant_num - 1;
      }
    }
  }

  ngOnInit() {

    // set defualt city
    this.departure_city = "--";
    this.departure_city_code = "";
    this.destination_city = "--";
    this.destination_city_code = "";

    // set defualt date when start form
    this.departures_date = this.todayDate;
    this.returns_date = this.tomorrow;
    this.departures_month = this.months_text[this.departures_date.getMonth()];
    this.departures_day = this.days_text[this.departures_date.getDay()];
    this.returns_month = this.months_text[this.returns_date.getMonth()];
    this.returns_day = this.days_text[this.returns_date.getDay()];


    //load city onload
    this.http.get<any>('https://intelisys-api.intelisys.ca/RESTv1/airports').subscribe(result => {
      this.city = result;
    });
    // load city pair
    this.http.get<any>('https://intelisys-api.intelisys.ca/RESTv1/cityPairs').subscribe(result => {
      this.city_pair = result;
    });

  }

  find_flights() {
    this.loading = true;
    const header = new HttpHeaders({ Authorization: 'Basic ' + btoa("SKYWAYAPI:Password123") })
    const param = new HttpParams()
      .set('cityPair', this.departure_city_code + "-" + this.destination_city_code)
      .set('cabinClass', 'Y')
      .set('departure', formatDate(this.departures_date, "yyyy-MM-dd", "en_US"))
      .set('return', formatDate(this.returns_date, "yyyy-MM-dd", "en_US"))
      .set('adultCount', this.adult_num.toString())
      .set('childCount', this.child_num.toString())
      .set('infantCount', this.infant_num.toString())
      .set('currency', 'USD');
    this.http.get<any>('https://intelisys-api.intelisys.ca/RESTv1/travelOptions', { params: param, headers: header }).subscribe(
      result => {
        this.travelOption_result = result;
        this.router.navigate(["selectClass"], {
          state: {
            data: this.travelOption_result,
            cityPair: this.departure_city_code + "-" + this.destination_city_code,
            depart: this.departure_city_code,
            arrival: this.destination_city_code,
            depart_name:this.departure_city,
            arrival_name:this.destination_city
          }
        });
        this.loading = false;
      });

    // this.router.navigate(["selectClass"],{ state: this.travelOption_result});
  }

}
