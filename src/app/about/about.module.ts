import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { aboutRoutes } from './about.routing';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(aboutRoutes)],
  exports: [RouterModule],
})
export class AboutModule {}
