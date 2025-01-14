import { Component, inject, Input, OnInit } from '@angular/core';
import { CertificationService } from '../../contacts/data-access/certification.service';
import { IconEdit } from '../../shared/ui/icons/edit';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';
import { Certification } from '../../contacts/shared/interfaces/certification.interface';
import { CommonModule } from '@angular/common';
import { IconRocket } from '../../shared/ui/icons/rocket';

@Component({
  selector: 'app-certification',
  standalone: true,
  imports: [IconEdit, IconRocket, ReactiveFormsModule, CommonModule ],
  templateUrl: './certification.component.html',
  styleUrl: './certification.component.scss'
})
export class CertificationComponent implements OnInit{
  @Input({ required: true }) id_comercio!: string;

  isOpen = [false, false, false, false, false, false, false, false, false, false, false, false];
  isOpenTodo = false;

  private _certificationService = inject(CertificationService);
  DataCertExist:boolean=false;

  dataCert:Certification = {
    id: '',
    id_certificacion: '',
    creden_prd: {
      registro: '',
      creacion: ''
    },
    look_feel_qa: {
      mask: '',
      form_required: '',
      pago_exitoso:  '',
      logo:  ''
    },
    tx_prd: {
      nacional_TDD: '',
      nacional_TDC: '',
      internacional_TDC: '',
    },
    tx_qa: {
      nacional_TDD: '',
      nacional_TDC: '',
      internacional_TDC: '',
    }
  };
  selectedOption: string = '';
  options = ['No Iniciado', 'En Proceso (Desa)', 'En espera', 'En revisión', 'Completado', 'Producción', 'Cancelado', 'Archivado']; //ordenar por prioridadya que eso dependera el color a asignar
  /* No Iniciado: La tarea aún no ha comenzado.
  En Proceso: La tarea está actualmente en ejecución.
  En Espera: La tarea está en pausa o esperando por algún recurso o decisión.
  Revisión: La tarea ha sido completada y está siendo revisada para asegurar calidad.
  Completado: La tarea se ha finalizado con éxito.
  Terminado: La tarea ha sido cerrada y no requiere más acciones.
  Cancelado: La tarea ha sido cancelada y no se completará.
  Archivado: La tarea ha sido completada y se ha guardado para referencia futura. */
  form: any;
  item_0:  string ="  ";
  item_1:  string ="  ";
  item_2:  string ="  ";
  item_3:  string ="  ";
  item_4:  string ="  ";
  item_5:  string ="  ";
  item_6:  string ="  ";
  item_7:  string ="  ";
  item_8:  string ="  ";
  item_9:  string ="  ";
  item_10: string ="  ";
  item_11: string ="  ";
;
  private _router = inject(Router);
  


  ngOnInit(): void {
    
    this.getCertificationComercio(this.id_comercio);
    
  }

  getCertificationComercio(id: string) {
    try {
       this._certificationService.getCertification(id).subscribe((data) => {
        this.dataCert = data[0];
        if (data[0] == undefined) {
          this.DataCertExist = false;

        } else {
          this.DataCertExist = true;
           //asignar estilos 
        this.item_0  = this.asignaColor(this.dataCert.tx_qa.nacional_TDD);
        this.item_1  = this.asignaColor(this.dataCert.tx_qa.nacional_TDC);
        this.item_2  = this.asignaColor(this.dataCert.tx_qa.internacional_TDC);
        this.item_3  = this.asignaColor(this.dataCert.look_feel_qa.mask);
        this.item_4  = this.asignaColor(this.dataCert.look_feel_qa.form_required);
        this.item_5  = this.asignaColor(this.dataCert.look_feel_qa.pago_exitoso);
        this.item_6  = this.asignaColor(this.dataCert.look_feel_qa.logo);
        this.item_7  = this.asignaColor(this.dataCert.creden_prd.registro);
        this.item_8  = this.asignaColor(this.dataCert.creden_prd.creacion);
        this.item_9  = this.asignaColor(this.dataCert.tx_prd.nacional_TDD);
        this.item_10 = this.asignaColor(this.dataCert.tx_prd.nacional_TDC);
        this.item_11 = this.asignaColor(this.dataCert.tx_prd.internacional_TDC);
        }
       
      });
    } catch (error) {
      this.DataCertExist = false;
      console.error("error al consultar table certificacion ", error);
    }
  }

  async createCertificationComercio(){
      try {
      let document = {
        id_comercio: this.id_comercio,
        creden_prd: {
          registro: 'sin actualización',
          creacion: 'sin actualización'
        },
        look_feel_qa: {
          mask: 'sin actualización',
          form_required: 'sin actualización',
          pago_exitoso:  'sin actualización',
          logo:  'sin actualización'
        },
        tx_prd: {
          nacional_TDD: 'sin actualización',
          nacional_TDC: 'sin actualización',
          internacional_TDC: 'sin actualización',
        },
        tx_qa: {
          nacional_TDD: 'sin actualización',
          nacional_TDC: 'sin actualización',
          internacional_TDC: 'sin actualización',
        }
      };
   
      await this._certificationService.createCertification(document)
      this._router.navigate(['/timeline', this.id_comercio]);
    } catch (error) {
      console.log("Di error: ", error)
    }
  }

  async updateCertificationComercio(id_certificacion:string, document2:Certification){//, recibir la consulta para ponerla en el json a actualizar
    try {
      await this._certificationService.updateCertification(id_certificacion, document2)

      this._router.navigate(['/timeline', this.id_comercio]);
    } catch (error) {
      console.log("Error: ", error)
    }
  }

  openMenu(indice:number) {
    this.isOpen[indice] = !this.isOpen[indice];
    this.isOpenTodo = false;
  }

  openMenuTodo() {
    this.isOpenTodo = !this.isOpenTodo;
    this.isOpen = [false, false, false, false, false, false, false, false, false, false, false, false];
  }

  selectOption(option: string, selector:string, indice:string) {
    this.selectedOption = option;

    /* this.openMenu(indice); */
    this.isOpen = [false, false, false, false, false, false, false, false, false, false, false, false];
    this.isOpenTodo = false;
    let document2: Certification = this.dataCert;

    if (selector == "todos") {
      document2 = {
        creden_prd: {
          registro: this.selectedOption,
          creacion: this.selectedOption
        },
        look_feel_qa: {
          mask: this.selectedOption,
          form_required: this.selectedOption,
          pago_exitoso:  this.selectedOption,
          logo:  this.selectedOption
        },
        tx_prd: {
          nacional_TDD: this.selectedOption,
          nacional_TDC: this.selectedOption,
          internacional_TDC: this.selectedOption,
        },
        tx_qa: {
          nacional_TDD: this.selectedOption,
          nacional_TDC: this.selectedOption,
          internacional_TDC: this.selectedOption,
        }
      };
    } else {
      document2[selector][indice] = this.selectedOption;
    }


    this.updateCertificationComercio(this.dataCert.id!, document2);

  }

  asignaColor(texto:string){
    let result:string = "";

    /* ['No Iniciado', 
    'En Proceso (Desa)', 
    'En espera de certificacion QA', 
    'En revisión', 
    'Completado (solicita terminal)', 
    'Producción', 
    'Cancelado', 
    'Archivado']; 
    */

    switch (texto) {
      case 'No Iniciado':
        result = "No-Iniciado";
      break;
      case 'En Proceso (Desa)':
        result = "En-Proceso";
      break;
      case 'En espera de certificacion QA':
        result = "En-Espera";
      break;
      case 'En revisión':
        result = "Revision";
      break;
      case 'Completado':
        result = "Completado";
      break;
      case 'Producción':
        result = "Produccion";
      break;
      case 'Cancelado':
        result = "Cancelado";
      break;
      case 'Archivado':
        result = "Archivado";
      break;
    default:
      result = "Archivado";
      break;
    }

    return result;
  };

  crearCertification(){
    this.createCertificationComercio();
  }

}
