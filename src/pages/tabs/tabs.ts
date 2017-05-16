import { Component } from '@angular/core';

import { OfferPage } from '../offer/offer';
import { ItemPage } from '../item/item';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ItemPage;
  tab3Root = OfferPage;

  constructor() {

  }
}
