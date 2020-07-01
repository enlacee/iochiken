import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
	selector: 'app-login',
	templateUrl: 'login.page.html',
	styleUrls: ['login.page.scss']
})
export class LoginPage {

	constructor(private authService: AuthService) {}

	//extra login fb
	loginfb() {
		this.authService.loginfb();
	}
}
