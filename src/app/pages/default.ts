import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppTranslationModule } from "../app-translation.module";
import { MatDialogModule } from "@angular/material";

import { ThemeModule } from "../@theme/theme.module";
import { ToasterModule } from "angular2-toaster";

export const commonModules = [
  ThemeModule,
  MatDialogModule,
  ToasterModule,
  AppTranslationModule,
  FormsModule,
  ReactiveFormsModule,
];
