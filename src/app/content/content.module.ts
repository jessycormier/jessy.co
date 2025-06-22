import { CommonModule } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LinkComponent } from '../shared/components/link/link.component';
import { contentRoutes } from './content.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(contentRoutes), LinkComponent],
  providers: [provideHttpClient(withFetch())],
})
export class ContentModule {}
