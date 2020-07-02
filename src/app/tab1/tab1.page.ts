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
  itemRef: any;
  dataJson: any = (data as any).default;

  constructor(
    private db: AngularFireDatabase,
    private router: Router,
    private localStorage: LocalStorageService
  ) {
    this.localStorage.set('dataJson', this.dataJson);
  }

  ngOnInit(){

    this.itemRef = this.db.object('test');
    this.itemRef.snapshotChanges().subscribe(action => {
      console.log(action.type);
      console.log(action.key);
      console.log(action.payload.val());
    });
  }

  goToproductDetail(id){
    console.log('id', id);
    this.router.navigate(['/tabs/tab1/' + id]);
  }
}
