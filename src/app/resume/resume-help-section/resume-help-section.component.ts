import { Component, signal } from '@angular/core';
import { LinkComponent } from '../../shared/components/link/link.component';
import { ResumeWordComponent } from '../resume-word/resume-word.component';

@Component({
  selector: 'app-resume-help-section',
  imports: [ResumeWordComponent, LinkComponent],
  templateUrl: './resume-help-section.component.html',
})
export class ResumeHelpSectionComponent {
  readonly isHelpVisible = signal(false);

  toggleHelp() {
    this.isHelpVisible.update(visible => !visible);
  }
}
