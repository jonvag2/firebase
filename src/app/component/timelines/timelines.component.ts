import { Component, Input, inject } from '@angular/core';
import { TimelineService } from '../../contacts/data-access/timeline.service';
import { Router } from '@angular/router';
import { ContactsService } from '../../contacts/data-access/contacts.service';
import { CapitalizePipe } from '../../pipe/capitalize.pipe';
import { IconCalendar } from '../../shared/ui/icons/calendar';

@Component({
  selector: 'app-timelines',
  standalone: true,
  imports: [CapitalizePipe, IconCalendar],
  templateUrl: './timelines.component.html',
  styleUrl: './timelines.component.scss'
})
export class TimelinesComponent {
  private _timelineService = inject(TimelineService);
  private _contactsService = inject(ContactsService);


  private _router = inject(Router);
  private _comercioId= '';

  timelines$ = this._timelineService.getTimelines();
  comercioInfo$:any= '';
  
  ngOnInit(): void {
   /*  this.timelines$.subscribe((data) => {
      console.log('data', data);
    }); */
  }

  @Input() set comercioId(value: string) {
    this._comercioId = value;
    console.log('data del pueblo', this._comercioId);


    this.getComercio(this._comercioId);
  }

  async getComercio(id: string) {
    try {
      console.log('voy a buscar esto', id);

      const comercio = await this._contactsService.getContact(id);

      console.log('comercio', comercio);
      if (!comercio) return;
      
      this.comercioInfo$ = comercio;
    } catch (error) {}
  }

}
