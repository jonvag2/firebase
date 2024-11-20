import { Component, inject, Input, OnInit } from '@angular/core';
import { CertificationService } from '../../contacts/data-access/certification.service';

@Component({
  selector: 'app-certification',
  standalone: true,
  imports: [],
  templateUrl: './certification.component.html',
  styleUrl: './certification.component.scss'
})
export class CertificationComponent implements OnInit{
  @Input({ required: true }) id_comercio!: string;

  private _certificationService = inject(CertificationService);
  private _router: any;


  ngOnInit(): void {
    
    this.getCertificationComercio(this.id_comercio);

    /* this.createCertificationComercio(); */

    

  }

  getCertificationComercio(id: string) {
    try {
       this._certificationService.getCertification(id).subscribe((data) => {
        console.log("data de certification: ", data);
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

}
