import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { getAuth } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return new Promise((resolve, reject) => {
      getAuth().onAuthStateChanged(user => {
        if (user && user.emailVerified) { // VIENE CONTROLLATO SE E' PRESENTE L'UTENTE E SE QUESTO HA L'EMAIL VERIFICATA
          resolve(true)
        } else {
          this.router.navigate(['/home']);
          resolve(false)
        }
      })
    })
  }
}
