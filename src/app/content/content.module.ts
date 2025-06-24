import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LinkComponent } from '../shared/components/link/link.component';
import { contentRoutes } from './content.routes';

@NgModule({
  imports: [CommonModule, LinkComponent, RouterModule.forChild(contentRoutes)],
  exports: [RouterModule],
})
export class ContentModule {}
