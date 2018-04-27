import { Component, AfterViewInit } from '@angular/core';
import { ToasterConfig, Toast, BodyOutputType, ToasterService } from "angular2-toaster";

import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent  {
  constructor() {
  }

}
