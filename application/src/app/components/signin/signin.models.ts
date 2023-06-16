import {FormControl} from '@angular/forms';

export interface signInForm {
  login: FormControl<string | null>;
  password: FormControl<string | null>;
}
