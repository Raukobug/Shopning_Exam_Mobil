import { Component } from '@angular/core';
import { Rest } from '../../providers/rest';
import { Items } from '../../models/items';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-item',
  templateUrl: 'item.html'
})
export class ItemPage {
  public id:number;
  public items:Array<Items>;
  public tempItems:Array<Items>;
  errorMessage: string;

  constructor(public navCtrl: NavController, private navParams: NavParams, public rest: Rest) {
    this.id = navParams.get('id');

    console.log(this.id);
  }
  ionViewDidLoad() {
    this.GetItems();
  }
  GetItems() {
    this.rest.GetItems()
       .subscribe(
         items => { this.items = items.filter(x => x.shop_id === this.id); this.tempItems = items.filter(x => x.shop_id === this.id) } ,
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
