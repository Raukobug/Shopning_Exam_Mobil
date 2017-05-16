import { Component } from '@angular/core';
import { Rest } from '../../providers/rest';
import { Items } from '../../models/items';
import { Shops } from '../../models/shops';
import { DateObject } from '../../models/dateObject';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-item',
  templateUrl: 'item.html'
})
export class ItemPage {
  private discount:boolean;
  public id:number;
  public items:Array<Items>;
  public shop:Shops;
  public tempItems:Array<Items>;
  errorMessage: string;
  public visits:Array<number>;
  public date:string;

  constructor(public navCtrl: NavController, private navParams: NavParams, public rest: Rest, private storage: Storage) {
    this.id = navParams.get('id');
    this.date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    this.discount = true;
  }
  ionViewDidLoad() {
    console.log(this.date);
    this.GetItems();

    if(this.id)
    {
      this.GetShop();
    }

    //Local storage for discount toggle
    
    if(this.storage.get('discount'))
    {
      this.storage.get('discount').then((val) => {
        this.discount = val;
      });
    }
    else
    {
      this.storage.set('discount', this.discount);
    }

    //Local storage for date and shop visit
    /*if(this.id)
    {
      //if there is a local storage with visits
      this.storage.get('visit').then((val) => {
        if(val != null)
        {      
          //if the current date is the same as in local storage, then set visitsArray to be same value as local storage array 
          if(val.filter(x => x.date === new Date))
          {
            console.log("check 2");
            this.visits = val;
          }
          //if current date is not the same as in local storage, then create new visitsArray, with a new object with a shop_id reference and a current date
          else
          {
            console.log("check 3");
            let date = new Date();
            let object = new DateObject();
            object.date = date.toLocaleDateString();
            object.shop_id = this.id;
            this.storage.set('visit', this.visits);
            this.visits.push(object);
          }
        }
        //if there isn't a local storage with visits, create one and then set array to contain new object
        else
        {
          console.log("check 4");
          let date = new Date().toLocaleDateString();
          let object = new DateObject();
          object.date = date;
          object.shop_id = this.id;
          this.storage.set('visit', object);
          this.visits.push(object);
          
        }
      });
    }*/
  }
  GetItems() {
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
    this.storage.set('discount', this.discount);
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
