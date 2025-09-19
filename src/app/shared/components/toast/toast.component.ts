import { Component, EventEmitter, HostBinding, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { IconsModule } from '../../icon.module';

@Component({
  selector: 'app-toast',
  imports: [IconsModule],
  templateUrl: './toast.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {

  @Output()
  close = new EventEmitter();

  @Input()
  show = true;

  @HostBinding('class.hidden')
  get isHidden() {
    return !this.show;
  }

  onCloseClick() {
    this.show = false;
    this.close.emit();
  }
}
