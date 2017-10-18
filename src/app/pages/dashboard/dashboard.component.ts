import { Component, AfterViewInit } from '@angular/core';
import { ToasterConfig, Toast, BodyOutputType, ToasterService } from "angular2-toaster";

import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements AfterViewInit {
  config: any;

  constructor(private toasterService: ToasterService) {
  }

  ngAfterViewInit() {
    window.setTimeout(() => this.showToast("info", "Hi dear user!", ""), 2000);
    window.setTimeout(() => this.showToast("success", "Congratulation", "We did it"), 5000);
    window.setTimeout(() => this.showToast("error", "", "We made the world a better place!"), 7000);
  }

  private showToast(type: string, title: string, body: string) {
    this.config = new ToasterConfig({
      positionClass: 'toast-bottom-left',
      timeout: 5000,
      newestOnTop: true,
      tapToDismiss: true,
      preventDuplicates: false,
      animation: 'flyLeft',
      limit: 5,
    });
    const toast: Toast = {
      type: type,
      title: title,
      body: body,
      timeout: 5000,
      showCloseButton: false,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }

}
