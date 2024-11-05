import { Routes } from '@angular/router';
import { EstatusComponent } from './component/estatus/estatus.component';
import ContactCreateComponent from './contacts/features/contact-create/contact-create.component';
import { TimelinesComponent } from './component/timelines/timelines.component';
import TimelineCreateComponent from './contacts/features/timeline-create/timeline-create.component';

export const routes: Routes = [
  

  {
    path: 'status',
    component: EstatusComponent
  },
  {
    path: 'timeline/:comercioId',
    component: TimelinesComponent
  },
  {
    path: 'timeline/create/:comercioId',
    component: TimelineCreateComponent
  },
  {
    path: '',
    loadChildren: () =>
      import('./contacts/features/contact-shell/contact-shell.routes'),
  },
/*   {
    path: 'inicio',
    loadChildren: () => import("./modules/home/HomeModule").then(m => m.HomeModule),
  } */
  {
    path: '**',
    redirectTo: '',
  },
];
