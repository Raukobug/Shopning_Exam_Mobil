import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Shops } from '../../models/shops';
import { Rest } from '../../providers/rest';
import { ItemPage } from '../item/item';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public shops:Array<Shops>;
  public tempShops:Array<Shops>;
  errorMessage: string;
  public day:String;
  public timeInHours:number;
  public timeInMinutes:number;
  public time:number;
  public tempTime:string;

  constructor(public navCtrl: NavController, public rest: Rest) {
    let date = new Date();
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    this.day = days[date.getDay()];

    /*this.time = date.getHours().toLocaleString();
    Number(this.time);*/
    this.timeInHours = date.getHours();
    this.timeInMinutes = date.getMinutes();
    this.tempTime = "" + this.timeInHours + "." + this.timeInMinutes;
    Number(this.tempTime); 

  }
  ionViewDidLoad() {   
    this.GetShops();  
  }

  GetShops() {
    this.rest.GetShops()
       .subscribe(
         shops => { this.shops = shops; this.tempShops = shops } ,
         error =>  this.errorMessage = <any>error);
  }
  SearchShops(ev: any) {

      // resets shops so that it continues to search when you delete
      this.shops = this.tempShops;

      // set val to the value of the searchbar
      let val = ev.target.value;

      // if the value is an empty string don't filter the shops
      if (val && val.trim() != '') {
        this.shops = this.shops.filter((shop) => {
          return (shop.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
  }
  pushPage(id)
  {
    this.navCtrl.push(ItemPage, {
      id: id
    });
    this.navCtrl
  }

}
