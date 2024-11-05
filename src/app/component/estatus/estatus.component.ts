import { Component, OnInit, inject } from '@angular/core';
import { ContactsService } from '../../contacts/data-access/contacts.service';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { CapitalizePipe } from '../../pipe/capitalize.pipe';

@Component({
  selector: 'app-estatus',
  standalone: true,
  imports: [AsyncPipe, CapitalizePipe],
  templateUrl: './estatus.component.html',
  styleUrl: './estatus.component.scss'
})
export class EstatusComponent implements OnInit{


  private _contactsService = inject(ContactsService);

  private _router = inject(Router);

  public calidad:any = [];
  public produccion:any = [];
  public desarrollo:any = [];

  contacts$ = this._contactsService.getContacts();
   ngOnInit(): void {
    const getContacts = this.contacts$.subscribe(data => {


      data.map(item => {

        if (item.ambiente == 'calidad') {
          this.calidad.push(item)
          
        } else if (item.ambiente == 'desarrollo') {
          this.desarrollo.push(item)
          
        }else {
          this.produccion.push(item)
        }
      })
      
    });

  }

}
