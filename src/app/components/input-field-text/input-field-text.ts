import { Component, input, output } from '@angular/core';

@Component({
  selector: 'input-field-text',
  imports: [],
  templateUrl: './input-field-text.html',
  styleUrl: './input-field-text.css',
})
export class InputFieldText {
  inputId = input.required<string>();
  inputName = input.required<string>();

  passDataEvent = output<{ id: string; value: string }>();

  onTypeEvent(event: Event) {
    const target = event.target as HTMLInputElement;
    // if (!['image'].includes(target.id)) {
    //   return;
    // }

    this.passDataEvent.emit({ id: target.id, value: target.value });
  }
}
