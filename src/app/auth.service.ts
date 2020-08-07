import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable,  } from 'rxjs';
import * as firebase from 'firebase/app'
import { Router } from "@angular/router";
import { LocalStorageService } from './local-storage.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public user: any;
  public dataStorageUser: any = {};

  constructor(
    private firebaseAuth:AngularFireAuth, // Inject Firebase auth service
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private localStorage: LocalStorageService,
    public router: Router,
    private db: AngularFireDatabase,
  ) {
    this.user = firebaseAuth.authState;
    this.firebaseAuth.authState.subscribe(user => {
      if (user) {/*console.log('user', user);*/}
    });

    // fill data user
    if (this.getUserData() !== null) {
      this.dataStorageUser = this.getUserData();
    }
  }

  // Returns true when user is looged in and email is verified
  public isLoggedIn(): boolean {
    return (this.getUserData() !== null) ? true : false;
  }

  public getUserData(): any {
    return this.localStorage.get('user');
  }

  //extra
  // Auth logic to run auth providers
  AuthLogin(provider:any) {
    return this.firebaseAuth.signInWithPopup(provider)
    .then((result) => {
      this.ngZone.run(() => { this.router.navigate(['/tabs/tab1']); console.log ('redirect to dashboard'); })

      console.log('result user', result.user);
      this.dataStorageUser['uid'] = result.user.uid;
      this.dataStorageUser['displayName'] = result.user.displayName;
      this.dataStorageUser['email'] = result.user.email;

      this.dataStorageUserSave(); //this.localStorage.set('user', this.dataStorageUser);
      this.getExtraDataToSignIn(result.user);
    }).catch((error) => {
      window.alert(error);
      console.log('error FB', error);

      this.localStorage.set('user', null);
    })
  }

  loginfb() {
    // firebase.auth().languageCode = 'es_ES';
    firebase.auth().useDeviceLanguage();
    var provider = new firebase.auth.FacebookAuthProvider();
    // provider.addScope('public_profile');
    provider.setCustomParameters({
      'display': 'popup'
    });

    return this.AuthLogin(provider);
  }

  // Create user
  signup(email:string, password:string) {
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }

  // Login user
  login(email: string, password: string) {
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }

  // LogOut user
  logout() {
    this.firebaseAuth
      .signOut();
  }

  /**
   * Obtener los datos extras del usuario y juantarlo todo  en el localstorage con el nombre 'user'
  */
  private getExtraDataToSignIn(user) {

    if (user.uid) {
      // Get data from firebase
      var itemRef = this.db.object('users/' + user.uid);
      itemRef.snapshotChanges().subscribe(action => {
        var object = action.payload.val() || {};

        this.dataStorageUser['address'] = object["address"] || '';
        this.dataStorageUser['phone'] = object["phone"] || '';
        this.localStorage.set('user', this.dataStorageUser);
      });
    }
  }

  public dataStorageUserSave() {
    this.localStorage.set('user', this.dataStorageUser);
  }
}
