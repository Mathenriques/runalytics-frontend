import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkbox-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox-select.component.html',
  styleUrls: ['./checkbox-select.component.scss']
})
export class CheckboxSelectComponent {
  @Input() label: string = '';
  @Input() options: any[] = [];
  @Output() selectedOptionsChange = new EventEmitter<any>();

  toggleSelection(option: any) {
    this.options.forEach(o => o.selected = false); 
    option.selected = true; 
    this.selectedOptionsChange.emit(option.value); 
  }
}
