import { Pipe, PipeTransform } from '@angular/core';

@Pipe({standalone:true,
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value; // Manejo de valores vacíos o nulos
    return value.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}