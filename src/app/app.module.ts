import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule }     from './app-routing.module'; 
import {LoginModalComponent} from './components/login-modal/login-modal.component';
import { DetailPopupComponent } from './components/detail-popup/detail-popup.component';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './services/auth.service';
import { NotifierModule } from 'angular-notifier';
import { SimpleNotificationsModule } from 'angular2-notifications';

import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule
} from '@angular/material';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ChainBuilderComponent } from './components/chain-builder/chain-builder.component';
import { BuilderComponent } from './components/builder/builder.component';
import { HowToFaqComponent } from './components/how-to-faq/how-to-faq.component';
import { InspireMeComponent } from './components/inspire-me/inspire-me.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    ChainBuilderComponent,
    LoginModalComponent,
    BuilderComponent,
    DetailPopupComponent,
    HowToFaqComponent,
    InspireMeComponent,
    CheckoutComponent
  ],
  imports: [
    HttpClientModule,
  	BrowserModule,
    BrowserAnimationsModule,
    CdkTableModule,
    CdkTreeModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    AppRoutingModule,
    SimpleNotificationsModule.forRoot()
  ],
  providers: [CookieService, AuthService],
  bootstrap: [AppComponent],
  entryComponents: [LoginModalComponent, DetailPopupComponent]
})
export class AppModule { }
