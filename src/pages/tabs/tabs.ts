import { Component } from '@angular/core';

import { OfferPage } from '../offer/offer';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = OfferPage;

  constructor() {

  }
}
