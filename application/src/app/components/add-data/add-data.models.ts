import {FormArray, FormControl} from '@angular/forms';

export interface addCategoryForm {
  name: FormControl<string | null>;
}

export interface addQuestionForm {
  text: FormControl<string | null>;
  answers: any;
  goodAnswer: FormControl<string | null>;
  categoryId: FormControl<string>;
}
