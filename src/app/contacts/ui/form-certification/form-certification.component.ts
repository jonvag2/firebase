import { Component } from '@angular/core';
import { IconEdit } from "../../../shared/ui/icons/edit";
import { IconDelete } from "../../../shared/ui/icons/delete";

@Component({
  selector: 'app-form-certification',
  standalone: true,
  imports: [IconEdit, IconDelete],
  template: `
  <button class="relative" type="button" (click)="openMenu()">
    <app-icon-edit />

    @if (isOpen) {
      <!-- Dropdown menu -->
      <div
        class="z-10 absolute right-0 top-7 p-1 min-w-24 bg-black rounded-md border border-gray-500/50 shadow overflow-hidden"
      >
        <ul
          class="text-sm text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          <li class="mb-1">
            <button
              class="w-full flex flex-row gap-x-2 items-center p-1 text-xs rounded-sm hover:bg-zinc-900"
              
            >
              <app-icon-edit /> Edit
            </button>
          </li>
          <li>
            <button
              
              class="w-full flex flex-row gap-x-2 items-center p-1 text-xs rounded-sm hover:bg-zinc-900"
            >
              <app-icon-delete /> Delete
            </button>
          </li>
        </ul>
      </div>
    }
  </button>
`,
  styleUrl: './form-certification.component.scss'
})
export class FormCertificationComponent {
  isOpen = false;

  openMenu() {
    this.isOpen = !this.isOpen;
  }

}
