import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'title',
})
export class TitlePipe implements PipeTransform {
  transform(result: number | undefined): any {
    if (!result) {
      return null;
    }

    if (result <= 1) {
      return 'Spróbuj jeszcze raz';
    } else if (result > 2 && result <= 4) {
      return 'Dobra Robota!';
    } else {
      return 'Poszło ci bardzo dobrze';
    }
  }
}
