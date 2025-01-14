export interface Certification {
    creden_prd: {
        registro: string;
        creacion: string;
    };
    id?: string;
    id_certificacion?: string;
    look_feel_qa: {
        mask: string;
        form_required: string;
        pago_exitoso: string;
        logo: string;
    };
    tx_prd: {
        nacional_TDD: string;
        nacional_TDC: string;
        internacional_TDC: string;
    };
    tx_qa: {
        nacional_TDD: string;
        nacional_TDC: string;
        internacional_TDC: string;
    };
    [key: string]: any; // Índice de firma
}