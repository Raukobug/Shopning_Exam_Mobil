import { Component } from '@angular/core';
import { Rest } from '../../providers/rest';
import { Items } from '../../models/items';
import { Shops } from '../../models/shops';
import { VisitStatistics } from '../../models/visitStatistics';
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
  public VisitStatistics:Array<VisitStatistics>;
  public VisitStatistic:VisitStatistics;

  constructor(public navCtrl: NavController, private navParams: NavParams, public rest: Rest, private storage: Storage) {
    this.id = navParams.get('id');
    this.date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    this.discount = true;
  }
  ionViewDidLoad() {
    this.GetItems();
    this.GetVisit();

    if(this.id)
    {
      this.GetShop();
    }

    //Local storage for discount toggle
    this.storage.get('discount').then((val) => {
      if(val !== null)
      {
        this.discount = val;
      }
      else
      {
        this.storage.set('discount', this.discount);
      }
    });


  }
  StorageCheck()
  {
        //Local storage for date and visits
    if(this.id)
    {
      this.storage.get('visitDate').then((val) => {
        if(val !== null)
        {
          if(val === this.date)
          {
            this.storage.get('visits').then((val) => {
              if(val != null)
              {        
                this.visits = val;

                if(!this.visits.find(x => x == this.id))
                {                
                  this.visits.push(this.id);
                  this.storage.set("visits", this.visits);

                  this.updateVisit(true);
                }
                else
                {
                  this.updateVisit(false);
                }
              }
              else
              {
                this.visits.push(this.id);
                this.storage.set("visits", this.visits);
                this.updateVisit(true);
              }
            });
          }
          else
          {
            this.storage.set("visitDate", this.date);
            this.visits = [];
            this.visits.push(this.id);
            this.storage.set("visits", this.visits)

            this.updateVisit(true);
          }
        }
        else
        {
          this.storage.set("visitDate", this.date);
          this.visits = [];
          this.visits.push(this.id);
          this.storage.set("visits", this.visits)

          this.updateVisit(true);
        }
       });
    }
  }
  updateVisit($bool) {
    let visit = new VisitStatistics();
    visit = this.VisitStatistics.pop();
    visit.visit_count = 1;

    if($bool)
    {
      visit.unique_visit_count = 1;
    }
    else
    {
      visit.unique_visit_count = 0;
    }
    this.rest.UpdateVisit(visit).then((result) => {
      console.log(result);
    }, (err) => {
      console.log(err);
    });
  }

  GetItems() {
    if(this.id)
    {
      this.rest.GetItems()
      .subscribe(
         items => { 
          if(!this.discount) { this.items = items.filter(x => x.shop_id === this.id) } else { this.items = items.filter(x => x.shop_id === this.id && x.discount !== 0) };
          if(!this.discount) { this.tempItems = items.filter(x => x.shop_id === this.id) } else { this.tempItems = items.filter(x => x.shop_id === this.id && x.discount !== 0) };
          },
          error =>  this.errorMessage = <any>error);
    }
    else
    {
      this.rest.GetItems()
        .subscribe(
          items => { 
          if(!this.discount) { this.items = items } else { this.items = items.filter(x => x.discount !== 0) };
          if(!this.discount) { this.tempItems = items } else { this.tempItems = items.filter(x => x.discount !== 0) };
          },
          error =>  this.errorMessage = <any>error);
    }
  }
  GetVisit() {
    let newdate = this.date.split("/").join("-");
    if(this.id)
    {
      this.rest.GetVisits()
      .subscribe(
         VisitStatistics => { this.VisitStatistics = VisitStatistics.filter(x => x.date.toString() == newdate && x.shop_id === this.id); this.StorageCheck(); },
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
