import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoutes } from './error.routing';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(errorRoutes)],
  exports: [RouterModule],
})
export class ErrorModule {}
