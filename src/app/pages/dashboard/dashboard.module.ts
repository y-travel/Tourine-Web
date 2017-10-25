import { NgModule } from '@angular/core';
import { AngularEchartsModule } from 'ngx-echarts';
import { ToasterModule } from "angular2-toaster";

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { ElectricityComponent } from './electricity/electricity.component';
import { ElectricityChartComponent } from './electricity/electricity-chart/electricity-chart.component';
import { WeatherComponent } from './weather/weather.component';
import { AppTranslationModule } from "../../app-translation.module";

const DASHBOARD_COMPONENTS = [
  DashboardComponent,
  ElectricityComponent,
  ElectricityChartComponent,
  WeatherComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    AngularEchartsModule,
    ToasterModule,
    AppTranslationModule
  ],
  declarations: [
    ...DASHBOARD_COMPONENTS
  ],
})
export class DashboardModule {
}
