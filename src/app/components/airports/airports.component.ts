import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-airports',
  templateUrl: './airports.component.html',
  styleUrls: ['./airports.component.css']
})
export class AirportsComponent implements OnInit {

  public searchString: string;

  airports:any;
  action:any;

  constructor(public dialogRef: MatDialogRef<AirportsComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
    this.airports = data.data;
    this.action = data.action;
  }

  ngOnInit() {
  }
  closed(){
    this.dialogRef.close({"status":"none selected"});
  }
  onSelect(code,name){
    this.dialogRef.close({"status":"selected","action":this.action,"city_code":code,"city_name":name});
  }

}
