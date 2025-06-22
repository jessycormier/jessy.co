import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.component.html',
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
