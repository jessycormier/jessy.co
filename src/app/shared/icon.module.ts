import { NgModule } from '@angular/core';

import {
  ArrowRight,
  ArrowLeft,
  House,
  Moon,
  Sun,
  X,
  LucideAngularComponent,
  LucideAngularModule,
} from 'lucide-angular';

@NgModule({
  declarations: [],
  imports: [
    LucideAngularModule.pick({
      ArrowRight,
      ArrowLeft,
      House,
      Moon,
      Sun,
      X,
    }),
  ],
  exports: [LucideAngularComponent],
})
export class IconsModule {}
