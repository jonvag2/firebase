import { Component, inject, Input, OnInit } from '@angular/core';
import { CertificationService } from '../../contacts/data-access/certification.service';
import { AsyncPipe } from '@angular/common';
import { IconDelete } from '../../shared/ui/icons/delete';
import { IconEdit } from '../../shared/ui/icons/edit';
import { FormCertificationComponent } from "../../contacts/ui/form-certification/form-certification.component";
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-certification',
  standalone: true,
  imports: [IconEdit, FormCertificationComponent, IconDelete, ReactiveFormsModule],
  templateUrl: './certification.component.html',
  styleUrl: './certification.component.scss'
})
export class CertificationComponent implements OnInit{
  @Input({ required: true }) id_comercio!: string;

  isOpen = false;

  private _certificationService = inject(CertificationService);
  private _router: any;

  dataCert:any;
  selectedOption: string = '';
  options = ['Opción 1', 'Opción 2', 'Opción 3'];
form: any;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.isOpen = false; // Cierra el dropdown después de seleccionar
  }

  ngOnInit(): void {
    
    this.getCertificationComercio(this.id_comercio);

    /* this.createCertificationComercio(); */

    

  }
  getCertificationComercio(id: string) {
    try {
       this._certificationService.getCertification(id).subscribe((data) => {
        this.dataCert = data;

        console.log("dataCert: ",this.dataCert);
      });

    } catch (error) {}
  }

  async createCertificationComercio(){
      try {
      let document = {
        id_comercio: this.id_comercio,
        creden_prd: {
          registro: 'A la espera de  QA',
          creacion: 'A la espera de  QA'
        },
        look_feel_qa: {
          mask: 'A la espera de  QA',
          form_required: 'A la espera de  QA',
          pago_exitoso:  'A la espera de  QA',
          logo:  'A la espera de  QA'
        },
        tx_prd: {
          nacional_TDD: 'A la espera de  QA',
          nacional_TDC: 'A la espera de  QA',
          internacional_TDC: 'A la espera de  QA',
        },
        tx_qa: {
          nacional_TDD: 'A la espera de  QA',
          nacional_TDC: 'A la espera de  QA',
          internacional_TDC: 'A la espera de  QA',
        }
      };
   
      await this._certificationService.createCertification(document)
      this._router.navigate(['/timeline', this.id_comercio]);
    } catch (error) {
      console.log("Di error: ", error)
    }
  }


  openMenu() {
    this.isOpen = !this.isOpen;
  }

  onSubmit(): void {
    console.log('Opción seleccionada:', this.selectedOption);
  }

}
