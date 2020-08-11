import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'modal-page',
	// templateUrl: './modal-page.html',
	template: `
	<ion-header translucent>
	<ion-toolbar color="primary">
	  <ion-title>Datos de Entrega</ion-title>
	  <ion-buttons slot="end">
	    <ion-button (click)="dismiss()">Close</ion-button>
	  </ion-buttons>
	</ion-toolbar>
	</ion-header>

	<ion-content fullscreen>
		<form (ngSubmit)="logForm()">
			<ion-card>
				<ion-card-header>
				  <ion-card-title>Dirección</ion-card-title>
				</ion-card-header>
				<ion-card-content>
					Lizardo montero 831
				</ion-card-content>
			</ion-card>

			<ion-card style="webkit-box-shadow: none;box-shadow: none;">
				<ion-list>
					<ion-item>
						<ion-label position="stacked">Referencia*</ion-label>
						<ion-input type="text" required></ion-input>
					</ion-item>

					<ion-item>
						<ion-label position="stacked">Teléfono de quien recibirá el pedido*</ion-label>
						<ion-input type="number" required></ion-input>
					</ion-item>

					<ion-item>
						<ion-label>Tipo de pago*</ion-label>
						<ion-select placeholder="">
							<ion-select-option value="cash">Efectivo</ion-select-option>
						</ion-select>
					</ion-item>

					<ion-item>
						<ion-label position="stacked">¿Con cúanto pagarás?(S/)*</ion-label>
						<ion-input type="number" required></ion-input>
					</ion-item>
				</ion-list>
			</ion-card>

			<div class="ion-padding">
				<ion-button expand="block" type="submit" class="ion-no-margin">Confirmar</ion-button>
			</div>
		</form>
	</ion-content>
	`
})

export class ModalPage {

	constructor(
		private modalController: ModalController,
		// private authService: AuthService
	) {}

	async dismiss() {
		console.log('click close!');
		// using the injected ModalController this page
		// can "dismiss" itself and optionally pass back data
		await this.modalController.dismiss({
			'dismissed': true
		});
	}

	logForm() {
		// event.preventDefault();
		console.log('onsubmit clic');
	}
}