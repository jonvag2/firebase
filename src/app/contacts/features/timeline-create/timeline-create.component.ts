import { Component, Input, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

export interface TimelineForm {
  fecha: FormControl<string>;
  id_comercio: FormControl<string>;
  description?: FormControl<string | undefined>;
}

@Component({
  selector: 'app-timeline-create',
  standalone: true,
  imports: [],
  template: `
    <div class="px-4 xl:px-0 w-full max-w-[600px] m-auto">
      <form [formGroup]="form" (ngSubmit)="createContact()">
        <div class="mb-8">
          <label for="first_name" class="block mb-2 text-sm font-medium"
            >Nombre del comercio</label
          >
          <input
            type="text"
            id="first_name"
            class="w-full p-3 rounded-md text-sm bg-transparent border-gray-500 border"
            placeholder="Empresa"
            formControlName="fullName"
          />
        </div>
        <div class="mb-8">
          <label for="ambiente" class="block mb-2 text-sm font-medium"
            >Ambiente</label
          >
          <input
            type="text"
            id="ambiente"
            class="w-full p-3 rounded-md text-sm bg-transparent border-gray-500 border"
            placeholder="Desarrollo/Calidad/Producción"
            formControlName="ambiente"
          />
        </div>
        <div class="mb-8">
          <label for="agenda" class="block mb-2 text-sm font-medium"
            >Agenda</label
          >
          <input
            type="text"
            id="agenda"
            class="w-full p-3 rounded-md text-sm bg-transparent border-gray-500 border"
            placeholder="Fecha"
            formControlName="agenda"
          />
        </div>
        <div class="mb-8">
          <label for="description" class="block mb-2 text-sm font-medium"
            >Description (optional)</label
          >
          <textarea
            rows="5"
            type="text"
            id="description"
            class="w-full p-3 rounded-md text-sm bg-transparent border-gray-500 border"
            placeholder="Your description goes here"
            formControlName="description"
          ></textarea>
        </div>

        <div class="flex justify-between items-center">
          <a
            class="text-sm flex text-nowrap items-center gap-x-2 hover:text-gray-300 transition-[color] ease-in-out duration-200 p-4 cursor-pointer"
            routerLink="/dashboard"
          >
            <app-icon-back />
            Back to dashboard
          </a>

          <button
            class="text-sm flex text-nowrap items-center gap-x-2 hover:text-gray-300 transition-[color] ease-in-out duration-200 p-4 cursor-pointer"
            type="submit"
          >
            <app-icon-rocket />
            @if (contactId) {
              Edit your contact
            } @else {
              Create your contact
            }
          </button>
        </div>
      </form>
    </div>
  `,
})
export default class TimelineCreateComponent {
  private _formBuilder = inject(FormBuilder).nonNullable;

  private _router = inject(Router);

  private _contactId = '';

  @Input() set contactId(value: string) {
    this._contactId = value;
    this.setFormValues(this._contactId);
  }

  form = this._formBuilder.group<TimelineForm>({
    fecha: this._formBuilder.control('', Validators.required),
    id_comercio: this._formBuilder.control('', Validators.required),
    description: this._formBuilder.control(''),
  });

}
