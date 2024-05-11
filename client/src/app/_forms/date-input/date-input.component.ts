import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrl: './date-input.component.scss'
})
export class DateInputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() maxDate!: Date;
  bsConfig!: Partial<BsDatepickerConfig>;

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;

  }

  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }

}
