import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';

import { CellHeaderComponent } from './cell-header/cell-header.component';
import { CellDetailComponent } from './cell-detail/cell-detail.component';
import { ThemeModule } from '../../@theme/theme.module';
import { CellToolbarComponent } from './cell-toolbar/cell-toolbar.component';
import { RowClickExpandDirective } from './row-click-expand/row-click-expand.directive';

const COMPONENTS = [
  CellHeaderComponent,
  CellDetailComponent,
  CellToolbarComponent,
  RowClickExpandDirective,
];
const GRID_MODULE = AgGridModule.withComponents([
  ...COMPONENTS
]);

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ThemeModule,
    GRID_MODULE,
  ],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
})
export class TrnAgGridModule {
  static withAgModule(): ModuleWithProviders[] {
    return [
      GRID_MODULE,
      {ngModule: TrnAgGridModule}
    ];
  }

}
