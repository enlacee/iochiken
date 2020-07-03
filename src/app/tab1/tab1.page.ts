import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage.service'

import  *  as  data  from  '../data.json';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  dataJson: any = (data as any).default;

  constructor(
    private db: AngularFireDatabase,
    private router: Router,
    private localStorage: LocalStorageService
  ) {

  }

  ngOnInit(){
    // load version local
    let currentDbVersion = 0;
    if (this.localStorage.get('appVars') !== null) {
      if (typeof this.localStorage.get('appVars') === 'object' && 'dbVersion' in this.localStorage.get('appVars')) {
          currentDbVersion = this.localStorage.get('appVars')['dbVersion'];
      }
    }
    this.localStorage.set('appVars', { "dbVersion" : currentDbVersion });

    // load data local
    let currentDataJson = this.dataJson;
    if (this.localStorage.get('dataJson') !== null) {
      if (typeof this.localStorage.get('dataJson') === 'object' && 'products' in this.localStorage.get('dataJson')) {
        currentDataJson = this.localStorage.get('dataJson');
      }
    }
    this.localStorage.set('dataJson', currentDataJson);
    this.dataJson = currentDataJson;




    // let currentDbVersion = (
    //   typeof this.localStorage.get('appVars') != null &&
    //   typeof this.localStorage.get('appVars') == 'object' &&
    //   'dbVersion' in this.localStorage.get('appVars')
    //   ) ? this.localStorage.get('appVars')['dbVersion'] : 0;

    // this.localStorage.set('appVars', { "dbVersion" : currentDbVersion });



    this.checkDatabaseVersion();
  }

  /**
   * Load app variables
   * Check version database firebase (appVars.dbVersion)
   */
  private checkDatabaseVersion() {
    let dataFirebase;
    let currentDbVersion = this.localStorage.get('appVars')['dbVersion'];
    console.log('currentDbVersion', currentDbVersion);

    // get data
    dataFirebase = this.db.object('appVars');
    dataFirebase.snapshotChanges().subscribe(action => {
      let appVarsPromise = action.payload.val();
      let statusForLoadData = false;

      // checking and update appVars
      if (appVarsPromise !== null) {
        if (typeof appVarsPromise === 'object' && 'dbVersion' in appVarsPromise) {
          if (currentDbVersion < appVarsPromise.dbVersion) {
            this.localStorage.set('appVars', appVarsPromise);
            console.log('appVars actualizado', this.localStorage.get('appVars'));
            statusForLoadData = true;
          }
        }
      }

      // Load data from database
      if (statusForLoadData == true) {
        this.loadDataJson();
      }
    });
  }

  /**
   * Load DataJson from firebase database
   */
  private loadDataJson() {
      let localDataJson;
      let dataJsonPromise;

      localDataJson = this.db.object('dataJson');
      localDataJson.snapshotChanges().subscribe(action => {
        dataJsonPromise = action.payload.val();

        if (dataJsonPromise !== null) {
          if (typeof dataJsonPromise === 'object' && 'products' in dataJsonPromise) {
              this.dataJson = dataJsonPromise;
              this.localStorage.set('dataJson', dataJsonPromise);
              // window.location.reload();
              console.log ('dataJson update! from firebase');
          }
        }
      });
  }

  goToproductDetail(id){
    console.log('id', id);
    this.router.navigate(['/tabs/tab1/' + id]);
  }
}
