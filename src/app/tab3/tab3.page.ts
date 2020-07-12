import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  userData: Object;
  idUser: any;
  inputAddress: any;
  inputPhone: any;
  statusLogin: Boolean;

  constructor(
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
    private localStorage: LocalStorageService,
    private db: AngularFireDatabase
  ) {
    this.statusLogin = this.authService.isLoggedIn();
    this.userData = authService.getUserData();
    this.idUser = (this.userData === null ) ? '' : this.userData["uid"];// ID user

    var itemRef = this.db.object('users/' + this.idUser);
    itemRef.snapshotChanges().subscribe(action => {
      var object = action.payload.val() || {};

      this.inputAddress = object["address"] || '';
      this.inputPhone = object["phone"] || '';
    });
  }

  ionViewWillEnter(){
    this.userData = this.authService.getUserData();

    // clear
    if (this.statusLogin === false) {
      this.inputAddress = '';
      this.inputPhone = '';
    }
  }

  public async areYouSureLogOutAlert() {
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

    await alert.present();
  }

   /**
   * logout firebase logOut
   */
  private async logout() {
    await this.authService.logout();
    this.localStorage.set('user', null);
    // redirect
    this.router.navigate(['/login']);
    console.log('redirect /login')
  }

  /**
   * Save data of user by ID-FACEBOOK
   */
  public saveSettings() {
    var dataToSave = {
      address: this.inputAddress,
      phone: this.inputPhone
    };

    if (this.statusLogin === true) {
      this.db.list('users').set(this.idUser, dataToSave);
    }
  }
}
