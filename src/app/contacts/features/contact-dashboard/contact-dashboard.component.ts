import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';

import { CardContactComponent } from '../../ui/card-contact/card-contact.component';
import { ContactsService } from '../../data-access/contacts.service';
import { Contact } from '../../shared/interfaces/contacts.interface';
import { SearchBarComponent } from '../../ui/search-bar/search-bar.component';
import { of } from 'rxjs';
import { BannerComponent } from '../../../shared/banner/banner.component';
import { Comercio } from '../../shared/interfaces/comercio.interface';

@Component({
  selector: 'app-contact-dashboard',
  template: `
    <app-banner/>
    <div class="px-4 xl:px-0 w-full max-w-[1200px] mx-auto my-10">
      <app-search-bar (changeQuery)="changeQuery($event)" />
      <section class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mt-8">
        @for (contact of contacts$ | async; track contact.id) {
          <app-card-contact
            [contact]="contact"
            (deleteContact)="deleteContact($event)"
            (editContact)="editContact($event)"
          />
        }
      </section>
    </div>
  `,
  standalone: true,
  imports: [CardContactComponent, SearchBarComponent, AsyncPipe, BannerComponent],
})
export default class ContactDashboardComponent {
  private _contactsService = inject(ContactsService);

  private _router = inject(Router);

  contacts$ = this._contactsService.getContacts();

  async deleteContact(id: string) {
    try {
      await this._contactsService.deleteContact(id);
    } catch (error) {}
  }

  editContact(contact: Comercio) {
    this._router.navigate(['/dashboard/edit', contact.id]);
  }

  async changeQuery(query: string) {
    try {
      const contacts = await this._contactsService.searchContactByQuery(query.toLowerCase());
      this.contacts$ = of(contacts);
    } catch (error) {}
  }
}
