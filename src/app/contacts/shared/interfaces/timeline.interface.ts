export interface Timeline extends TimelineForm {
    id: string;
  }
  
  export interface TimelineForm {
    fecha: string;
    id_comercio: string;
    description?: string;
  }
  