import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable,  } from 'rxjs';
import * as firebase from 'firebase/app'

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public user: any;

  constructor(
    private firebaseAuth:AngularFireAuth, // Inject Firebase auth service
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    this.user = firebaseAuth.authState;
  }

  //extra
  // Auth logic to run auth providers
  AuthLogin(provider:any) {
    return this.firebaseAuth.signInWithPopup(provider)
    .then((result) => {
      this.ngZone.run(() => {
          // this.router.navigate(['dashboard']);
          console.log ('redirect to dashboard');
        })
        console.log('result', result);
        console.log('result user', result.user);
      // this.SetUserData(result.user); //ACTUALIZA LA DATA PARA HACER ALGO X ESTE
    }).catch((error) => {
      window.alert(error)
    })
  }

  loginfb() {
    // firebase.auth().languageCode = 'es_ES';
    firebase.auth().useDeviceLanguage();

    var provider = new firebase.auth.FacebookAuthProvider();
    // provider.addScope('public_profile');

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


}
