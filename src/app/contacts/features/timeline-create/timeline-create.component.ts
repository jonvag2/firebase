import { Component, Input, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { TimelineService } from '../../data-access/timeline.service';
import { IconBack } from "../../../shared/ui/icons/back";
import { IconRocket } from "../../../shared/ui/icons/rocket";

export interface TimelineForm {
  fecha: FormControl<string>;
  id_comercio: FormControl<string>;
  description: FormControl<string>;
}

@Component({
  selector: 'app-timeline-create',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, IconBack, IconRocket],
  template: `
    <div class="px-4 xl:px-0 w-full max-w-[600px] m-auto">
      <form [formGroup]="form" (ngSubmit)=" createTimeline()">
        <div class="mb-8">
          <label for="description" class="block mb-2 text-sm font-medium"
            >Descripción</label
          >
          <textarea
            rows="5"
            type="text"
            id="description"
            class="w-full p-3 rounded-md text-sm bg-transparent border-gray-500 border"
            placeholder="Escriba una  descripción"
            formControlName="description"
          ></textarea>
        </div>

        <div class="flex justify-between items-center">
          <a
            class="text-sm flex text-nowrap items-center gap-x-2 hover:text-gray-300 transition-[color] ease-in-out duration-200 p-4 cursor-pointer"
           (click)= "timelineContact()"
          >
            <app-icon-back />
            Atrás
          </a>

          <button
            class="text-sm flex text-nowrap items-center gap-x-2 hover:text-gray-300 transition-[color] ease-in-out duration-200 p-4 cursor-pointer"
            type="submit"
          >
            <app-icon-rocket />
              Crear una actividad
          </button>
        </div>
      </form>
    </div>
  `,
})
export default class TimelineCreateComponent {
  private _formBuilder = inject(FormBuilder).nonNullable;

  private _router = inject(Router);

  private _timelineService = inject(TimelineService);

  private _comercioId = '';

  @Input() set comercioId(value: string) {
    this._comercioId = value;
  }

  form = this._formBuilder.group<TimelineForm>({
    fecha: this._formBuilder.control('se llena en el  service'),
    id_comercio: this._formBuilder.control(''),
    description: this._formBuilder.control(''),
  });

  async createTimeline() {
    if (this.form.invalid) return;

    try {
      const timeline = this.form.value as unknown as TimelineForm;
      const timelineFormateado = {
        fecha: timeline.fecha,
        id_comercio: this._comercioId,
        description: timeline.description
      }
      await this._timelineService.createTimeline(timelineFormateado)
      this._router.navigate(['/timeline', this._comercioId]);
    } catch (error) {
      console.log("Di ereror: ", error)
    }
  }

  timelineContact() {
    this._router.navigate(['/timeline', this._comercioId]);
  }

}
