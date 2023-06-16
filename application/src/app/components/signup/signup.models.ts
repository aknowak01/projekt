import {FormControl} from '@angular/forms';

export interface signUpForm {
  name: FormControl<string | null>;
  password: FormControl<string | null>;
  email: FormControl<string | null>;
}
