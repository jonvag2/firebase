import { Component, Input, inject } from '@angular/core';
import { TimelineService } from '../../contacts/data-access/timeline.service';
import { Router, RouterLink } from '@angular/router';
import { ContactsService } from '../../contacts/data-access/contacts.service';
import { CapitalizePipe } from '../../pipe/capitalize.pipe';
import { IconCalendar } from '../../shared/ui/icons/calendar';
import { IconPlus } from "../../shared/ui/icons/plus";
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-timelines',
  standalone: true,
  imports: [CapitalizePipe, IconCalendar, IconPlus, RouterLink, AsyncPipe],
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
  timelinesComercio$:any= '';

  
  ngOnInit(): void {
   
    this.getTimelinesComercio(this._comercioId);
  }

  @Input() set comercioId(value: string) {
    this._comercioId = value;
    this.getComercio(this._comercioId);
  }

  async getComercio(id: string) {
    try {
      const comercio = await this._contactsService.getContact(id);

      if (!comercio) return;
      
      this.comercioInfo$ = comercio;
    } catch (error) {}
  }

  getTimelinesComercio(id: string) {
    try {
       this._timelineService.getTimelinesComercio(id).subscribe((data) => {
        console.log("antes: ",data);

        // Ordenar en orden descendente
          data.sort((a:any, b:any) => b.createdAt - a.createdAt);
        console.log("despues: ",data);

        this.timelinesComercio$ = data
      });

    } catch (error) {}
  }

  createTimeline() {
    this._router.navigate(['/timeline/create', this._comercioId]);
  }

}
