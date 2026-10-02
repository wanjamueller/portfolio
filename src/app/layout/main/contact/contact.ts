import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

const emailPattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
//^[^\s@]+      one or more characters that are not a space or @  (name part)
// @             exactly one @
// [^\s@]+       domain name, again no spaces or @
// \.            a literal dot
// [a-zA-Z]{2,}$ top-level domain: at least 2 letters at the end (de, com, berlin)

const namePattern = /^\p{L}+(?:[' .-]\p{L}+)*\.?$/u;
// ^             start of the text, nothing may come before
// \p{L}+        one or more letters (any language: a, ü, é, ł, 李 …) → the first word
// (?:           start a group (?: means "group only, don't capture it")
//  [' .-]        exactly ONE separator: apostrophe, space, dot or hyphen
//  \p{L}+        followed by one or more letters → the next word part
// )*            the group can repeat 0 or more times → any number of further word parts
// \.?           an optional dot at the very end (for e.g. "Ana M.")
// $             end of the text, nothing may come after
// u             Unicode flag, required for \p{L} to work

function minLetters(min: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value ?? '';
    if (!value.trim()) return null;
    const letters = value.match(/\p{L}/gu)?.length ?? 0;
    // count the letters:
    //   /\p{L}/  matches one letter of any language
    //   g        global: find ALL matches, not just the first
    //   u        Unicode flag, required for \p{L}
    return letters >= min ? null : { minLetters: { required: min, actual: letters } };
  };
}

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-contact',
  styleUrl: './contact.scss',
  templateUrl: './contact.html',
})
export class Contact {
  contactForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(40),
      Validators.pattern(namePattern),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(emailPattern),
    ]),
    help: new FormControl('', [Validators.required, Validators.maxLength(200), minLetters(10)]),
    privacy: new FormControl(false, [Validators.requiredTrue]),
  });

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched(); // shows all errors when Send is clicked too early
      return;
    }
    console.log(this.contactForm.value);
    this.contactForm.reset();
  }
}
