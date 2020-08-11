import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service'
import { ActivatedRoute, Router } from '@angular/router';

import { ModalController } from '@ionic/angular';
import { ModalPage } from './modal.page';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-tab1detalle',
  templateUrl: './tab1detalle.page.html',
  styleUrls: ['./tab1detalle.page.scss'],
})
export class Tab1detallePage implements OnInit {
	dataJson:any;
	data: any;

	constructor(
		private localStorage: LocalStorageService,
		private route: ActivatedRoute,
		private router: Router,
		public modalController: ModalController,
		private authService: AuthService,
	) {
		this.dataJson = this.localStorage.get('dataJson');
	}

	ngOnInit() {
		let idSearch;
		if (this.route.snapshot.params['id']) {
			idSearch = parseInt(this.route.snapshot.params['id']);
			if('products' in this.dataJson) {
				this.data = this.dataJson.products.find( e => e.id === idSearch);
			} else {
				alert('Product not found');
			}
		}
	}

	ionViewWillEnter(){
		// this.userData = this.authService.getUserData();
	}

	async presentModal() {
		const modal = await this.modalController.create({
			component: ModalPage,
			cssClass: 'my-custom-class',
			componentProps: {
				'firstName': 'Douglas',
				'lastName': 'Adams',
				'middleInitial': 'N'
			}
		});

		return await modal.present();
	}

}
