import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../app-translation.module';

import { ThemeModule } from '../@theme/theme.module';

export const COMMON_MODULES = [
  ThemeModule,
  AppTranslationModule,
  FormsModule,
  ReactiveFormsModule,
];
