import { Component } from '@angular/core';
import { Rest } from '../../providers/rest';
import { Items } from '../../models/items';
import { Shops } from '../../models/shops';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-item',
  templateUrl: 'item.html'
})
export class ItemPage {
  private discount:boolean = false;
  public id:number;
  public items:Array<Items>;
  //public shops:Array<Shops>;
  public shop:Shops;
  public tempItems:Array<Items>;
  errorMessage: string;

  constructor(public navCtrl: NavController, private navParams: NavParams, public rest: Rest) {
    this.id = navParams.get('id');

  }
  ionViewDidLoad() {
    this.GetItems();
    this.GetShop();
  }
  GetItems() {
    console.log(this.discount);
    if(this.id)
    {
      this.rest.GetItems()
      .subscribe(
         items => { 
          if(this.discount) { this.items = items.filter(x => x.shop_id === this.id) } else { this.items = items.filter(x => x.shop_id === this.id && x.discount !== 0) };
          if(this.discount) { this.tempItems = items.filter(x => x.shop_id === this.id) } else { this.tempItems = items.filter(x => x.shop_id === this.id && x.discount !== 0) };
          },
          error =>  this.errorMessage = <any>error);
    }
    else
    {
      this.rest.GetItems()
        .subscribe(
          items => { 
          if(this.discount) { this.items = items } else { this.items = items.filter(x => x.discount !== 0) };
          if(this.discount) { this.tempItems = items } else { this.tempItems = items.filter(x => x.discount !== 0) };
          },
          error =>  this.errorMessage = <any>error);
    }

  }
  GetShop() {
    this.rest.GetShop(this.id)
       .subscribe(
         shops => { this.shop = shops; } ,
         error =>  this.errorMessage = <any>error);
  }
  RemoveShop()
  {
    this.shop = null;
    this.id = null;
    this.rest.GetItems()
       .subscribe(
          items => { this.items = items; this.tempItems = items } ,
          error =>  this.errorMessage = <any>error);
  }
  Change()
  {    
    this.GetItems();
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
