import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  test = require('./data.json');
  constructor() { }

  ngOnInit() {
    console.log(this.test.result);
  }

}
