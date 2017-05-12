import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Shops } from '../../models/shops';
import { Rest } from '../../providers/rest';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //public accesslevels:Array<AccessLevel> = new Array<AccessLevel>();
  public shops:Array<Shops>;
  errorMessage: string;

  constructor(public navCtrl: NavController, public rest: Rest) {
  
  }
  ionViewDidLoad() {
    this.GetShops();
  }

  GetShops() {
    this.rest.GetShops()
       .subscribe(
         shops => this.shops = shops,
         error =>  this.errorMessage = <any>error);
  }
  SearchShops(ev: any) {

    // Reset shops back to all of the shops
    this.GetShops();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the shops
    if (val && val.trim() != '') {
      this.shops = this.shops.filter((shop) => {
        return (shop.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
