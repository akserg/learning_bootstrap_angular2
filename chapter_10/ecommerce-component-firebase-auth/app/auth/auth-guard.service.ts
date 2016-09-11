/*
 * Angular Imports
 */
import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

/*
 * Observable Imports
 */
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

/*
 * Components
 */
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.auth.firebaseAuth
      .take(1)
      .map(authState => !!authState)
      .do(authenticated => {
        if (!authenticated) {
          this.router.navigate(['/signin']);
        }
      });
  }
}
