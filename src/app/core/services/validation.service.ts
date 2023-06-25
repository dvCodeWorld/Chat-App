import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  public validateEmail(controls?: any) {
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    
    return regExp.test(controls?.value) ? null : { validateEmail: true }
  }

  public validateAlphabetOnly(controls?: any) {
    const regExp = new RegExp(/^[A-Za-z\s]*$/);
    
    return regExp.test(controls?.value) ? null : { validateAlphabetOnly: true }
  }
}
