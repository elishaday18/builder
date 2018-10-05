import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { BuilderComponent } from './components/builder/builder.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HowToFaqComponent } from './components/how-to-faq/how-to-faq.component';
import { InspireMeComponent } from './components/inspire-me/inspire-me.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'builder', component: BuilderComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'faq', component: HowToFaqComponent },
  { path: 'inspire-me', component: InspireMeComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }