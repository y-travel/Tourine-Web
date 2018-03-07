import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppTranslationModule } from "../app-translation.module";
import { MatDialogModule } from "@angular/material";

import { ThemeModule } from "../@theme/theme.module";
import { ToasterModule } from "angular2-toaster";

export const COMMON_MODULES = [
  ThemeModule,
  MatDialogModule,
  ToasterModule,
  AppTranslationModule,
  FormsModule,
  ReactiveFormsModule,
];
