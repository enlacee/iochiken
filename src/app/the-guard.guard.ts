import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TheGuardGuard implements CanActivate {

	constructor(
		public authService: AuthService,
		public router: Router
	) {}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): boolean {

		let statusLogin = this.authService.isLoggedIn();
		console.log('statusLogin', statusLogin);
		if ( statusLogin === true ) {
			this.router.navigate(['/tabs']); //Lo enviamos a la página que queramos
			return false;
		}

		return true;
	}
}
