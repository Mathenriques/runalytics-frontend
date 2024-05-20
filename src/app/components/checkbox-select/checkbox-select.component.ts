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
    this.options.forEach(o => o.selected = false); // Desmarcar todas as opções
    option.selected = true; // Marcar a opção atual
    this.selectedOptionsChange.emit(option); // Emitir a opção selecionada
  }
}
