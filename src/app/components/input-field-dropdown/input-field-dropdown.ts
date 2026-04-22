import { Component, input, output, signal } from '@angular/core';

type Item = {
  name: string;
  value: string;
};

@Component({
  selector: 'input-field-dropdown',
  imports: [],
  templateUrl: './input-field-dropdown.html',
  styleUrl: './input-field-dropdown.css',
})
export class InputFieldDropdown {
  optionValues = input.required<Item[]>();
  selectId = input.required<string>();

  passDataEvent = output<{ id: string; value: string }>();

  onChangeEvent(event: Event) {
    console.log(1);
    const target = event.target as HTMLSelectElement;
    this.passDataEvent.emit({ id: target.id, value: target.value });
  }
}
