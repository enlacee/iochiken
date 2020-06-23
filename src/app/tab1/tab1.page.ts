import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  itemRef: any;

  constructor(private db: AngularFireDatabase) {}

  ngOnInit(){
    this.itemRef = this.db.object('test');
    this.itemRef.snapshotChanges().subscribe(action => {
      console.log(action.type);
      console.log(action.key);
      console.log(action.payload.val());
    });

  }
}
