import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-character-modal',
  standalone: false,
  templateUrl: './character-modal.component.html',
  styleUrl: './character-modal.component.css',
})
export class CharacterModalComponent {
  @Input()
  character: any;
  
  @Output()
  close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
