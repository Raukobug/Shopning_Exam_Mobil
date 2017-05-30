import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Rest } from '../../providers/rest';
import { Items } from '../../models/items';

@Component({
  selector: 'page-offer',
  templateUrl: 'offer.html'
})
export class OfferPage {

  public items:Array<Items>;
  public tempItems:Array<Items>;
  errorMessage: string;
  public emptyOffer:Boolean = false;

  constructor(public navCtrl: NavController, public rest: Rest) {
    this.items = [];
  }

  ionViewDidLoad() {
    this.GetItems();
  }
  GetItems() {
    this.rest.GetItems()
       .subscribe(
         items => { this.items = items.filter(x => x.offer !== 0); this.tempItems = items.filter(x => x.offer !== 0); if(items.filter(x => x.offer == 0).length == 0) this.emptyOffer = true; } ,
         error =>  this.errorMessage = <any>error);
         
  }
  SearchItems(ev: any) {

      // Reset shops back to all of the shops, except something faults. Possibly because of lack of promise
      this.items = this.tempItems;

      // set val to the value of the searchbar
      let val = ev.target.value;

      // if the value is an empty string don't filter the shops
      if (val && val.trim() != '') {
        this.items = this.items.filter((item) => {
          return (item.product.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
  }

}
