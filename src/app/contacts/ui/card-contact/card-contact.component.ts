import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../../shared/interfaces/contacts.interface';
import { MenuComponent } from '../menu/menu.component';
import { Comercio } from '../../shared/interfaces/comercio.interface';
import { CapitalizePipe } from '../../../pipe/capitalize.pipe';

@Component({
  selector: 'app-card-contact',
  template: `
    <div class="border border-gray-500/50 rounded-md p-4 flex flex-row gap-x-4">
      <div class="flex-1">
        <h4 class="text-white mb-2 font-bold">{{ contact.fullName | capitalize }}</h4>
        <small class="text-yellow-500 mb-2">{{ contact.agenda }}</small>
        <p class="text-gray-300 mb-2">{{ contact.ambiente | capitalize }}</p>
        <p class="text-gray-400 text-sm">
          {{
            !contact.description ? 'No description here.' : contact.description
          }}
        </p>
      </div>
      <div>
        <app-menu
          (onEditContact)="onEditContact(contact)"
          (onDeleteContact)="onDeleteContact(contact)"
        />
      </div>
    </div>
  `,
  standalone: true,
  imports: [MenuComponent, CapitalizePipe],
})
export class CardContactComponent {
  @Input({ required: true }) contact!: Comercio;

  @Output() editContact = new EventEmitter<Comercio>();

  @Output() deleteContact = new EventEmitter<string>();

  onEditContact(contact: Comercio) {
    this.editContact.emit(contact);
  }

  onDeleteContact(contact: Comercio) {
    this.deleteContact.emit(contact.id);
  }
}
