export interface Comercio extends ComercioForm {
    id: string;
  }
  
  export interface ComercioForm {
    fullName: string;
    ambiente: string;
    agenda: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
  }
  