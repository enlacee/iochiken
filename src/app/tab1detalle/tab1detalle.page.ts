import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service'

@Component({
  selector: 'app-tab1detalle',
  templateUrl: './tab1detalle.page.html',
  styleUrls: ['./tab1detalle.page.scss'],
})
export class Tab1detallePage implements OnInit {

	dataJson: any;

	constructor(
		private localStorage: LocalStorageService
	) {
		this.dataJson = this.localStorage.get('dataJson');
	}

	ngOnInit() {
	}

	ionViewWillEnter(){
		// this.userData = this.authService.getUserData();
	}

}
