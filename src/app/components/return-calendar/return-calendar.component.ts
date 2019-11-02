import { Component, OnInit, Inject } from '@angular/core';
import {NgbDate, NgbCalendar, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-return-calendar',
  templateUrl: './return-calendar.component.html',
  styleUrls: ['./return-calendar.component.css']
})
export class ReturnCalendarComponent implements OnInit {
  hoveredDate: NgbDate;

  fromDate: NgbDate;
  toDate: NgbDate;
  constructor(calendar: NgbCalendar,private config: NgbDatepickerConfig,public dialogRef: MatDialogRef<ReturnCalendarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    let today = calendar.getToday();
    config.minDate = today;
    config.navigation = "none";

    var departures_month = data.departures.getMonth()+1;
    var returns_month = data.returns.getMonth()+1;
    // this.fromDate = calendar.getToday();
    // this.toDate = calendar.getNext(calendar.getToday(), 'd', 5);
    this.fromDate = new NgbDate(data.departures.getFullYear(), departures_month, data.departures.getDate());
    this.toDate = new NgbDate(data.returns.getFullYear(), returns_month, data.returns.getDate());

  }

  ngOnInit() {
  }
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else{
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }
  select(){
    this.dialogRef.close({"fromdate":this.fromDate,"todate":this.toDate});
  }
  
}
