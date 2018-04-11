import { Component, OnInit } from '@angular/core';
import { ApiConvert } from './shared/helper/api-convert';
import * as moment from 'moment';
import { Dashboard } from './models/dashboard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  arr = [1, 2, 3];
  dataJson = require('./data.json');
  
  show = 'a';
  dateString = '4/4/2017';
  dateTimestamp;
  userName;
  dateFormat: 'DD/MM/YYYY';
  date_format = 'DD/MM/YYYY';
  datetimeFormat: 'DD/MM/YYYY hh:mm';
  // hh = giờ 12
  // HH = giờ 24
  // format X = second
  // format x = milisecond

  constructor(private apiConver: ApiConvert) {
  }

  ngOnInit(): void {
    const data = this.convertDashboard(this.dataJson.result.dashBoardItems);
    console.log(data);
  }

  setName() {
    this.apiConver.setUserName('huy');
  }

  timestampToDate(date: number): string {
    return moment(date).format(this.date_format);
  }

  dateStringToTimestamp(date: string): number {
    return Number.parseInt(moment(date, this.date_format).format('x'));
  }
  // 10/04/2018 -> 1514530635817

  convertDashboard(data: any[]): Dashboard[] {
    const result = [];
    data.forEach(item => {
      const dashBoard = new Dashboard();
      dashBoard.code = item.demand.number;
      result.push(dashBoard);
    });
    return result;
  }
}
