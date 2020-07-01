import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage.service'



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  userData: Object;

  constructor(
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
    private localStorage: LocalStorageService
  ) {
    this.userData = authService.getUserData();
  }

  ionViewWillEnter(){
    this.userData = this.authService.getUserData();
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

  async logout() {
    await this.authService.logout();
    this.localStorage.set('user', null);
    // redirect
    this.router.navigate(['/login']);
    console.log('redirect /login')
  }
}
