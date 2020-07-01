import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  userData: Object;

  constructor(
    private alertController: AlertController,
    private authService: AuthService
  ) {
    this.userData = authService.getUserData();
  }

  async areYouSureLogOutAlert() {
  	let alert = await this.alertController.create({
  		cssClass: '',
  		header: '',
  		subHeader: '',
  		message: '¿Seguro de querer salir?',
  		buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Si',
          handler: () => {
            this.logout();
            console.log('Confirm logout()');
          }
        }
      ]
  	});

    // return alert;
    await alert.present();
  }

  logout() {
    this.authService.logout();
  }
}
