import { NgModule } from '@angular/core';

import {
  ArrowRight,
  ArrowLeft,
  House,
  Menu,
  Moon,
  Sun,
  X,
  TriangleAlert,
  LucideAngularComponent,
  LucideAngularModule,
  Frown,
} from 'lucide-angular';

@NgModule({
  declarations: [],
  imports: [
    LucideAngularModule.pick({
      ArrowRight,
      ArrowLeft,
      House,
      Moon,
      Menu,
      Frown,
      Sun,
      X,
      TriangleAlert,
    }),
  ],
  exports: [LucideAngularComponent],
})
export class IconsModule {}
