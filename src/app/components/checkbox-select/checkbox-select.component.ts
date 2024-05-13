import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-checkbox-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox-select.component.html',
  styleUrls: ['./checkbox-select.component.css']
})
export class CheckboxSelectComponent {
  @Input() label: string = '';
  @Input() options: any[] = [];
  @Output() selectedOptionsChange = new EventEmitter<any[]>();

  toggleSelection(option: any) {
    option.selected = !option.selected;
    this.selectedOptionsChange.emit(this.options.filter(o => o.selected));
  }
}
