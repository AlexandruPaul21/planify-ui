import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DropdownModule } from "primeng/dropdown";
import { InputNumberModule } from "primeng/inputnumber";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { LoginComponent } from './authentication/login/login.component';
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import { SplitterModule } from "primeng/splitter";
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RippleModule } from "primeng/ripple";
import { ProvidersMasterViewComponent } from './client/providers-master-view/providers-master-view.component';
import { TableModule } from "primeng/table";
import { MenubarModule } from "primeng/menubar";
import { ClientContractsComponent } from './client/client-contracts/client-contracts.component';
import { ProviderProfilePageComponent } from './provider/provider-profile-page/provider-profile-page.component';
import { ClientProfilePageComponent } from './client/client-profile-page/client-profile-page.component';
import { ProviderContractsComponent } from './provider/provider-contracts/provider-contracts.component';
import { ClientEventsComponent } from './client/client-events/client-events.component';
import { ClientNavbarComponent } from './client/client-navbar/client-navbar.component';
import { NgOptimizedImage } from '@angular/common';
import { ProviderNavbarComponent } from './provider/provider-navbar/provider-navbar.component';
import { CalendarModule } from "primeng/calendar";
import { ProviderCalendarComponent } from './provider/provider-calendar/provider-calendar.component';
import { DataViewModule } from "primeng/dataview";
import { ListboxModule } from 'primeng/listbox';
import { PickListModule } from "primeng/picklist";
import { ProviderInvoicesComponent } from './provider/provider-invoices/provider-invoices.component';
import { ToastModule } from "primeng/toast";
import { MessagesModule } from 'primeng/messages';
import { RatingPipe } from './utils/pipes/rating.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    ProvidersMasterViewComponent,
    ClientContractsComponent,
    ProviderProfilePageComponent,
    ClientProfilePageComponent,
    ProviderContractsComponent,
    ClientEventsComponent,
    ClientNavbarComponent,
    ProviderNavbarComponent,
    ProviderCalendarComponent,
    ProviderInvoicesComponent,
    RatingPipe
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    DropdownModule,
    InputNumberModule,
    BrowserModule,
    RouterLink,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    InputTextModule,
    PasswordModule,
    CardModule,
    ButtonModule,
    SplitterModule,
    RippleModule,
    TableModule,
    MenubarModule,
    NgOptimizedImage,
    CalendarModule,
    DataViewModule,
    ListboxModule,
    PickListModule,
    ToastModule,
    MessagesModule,
  ],
  providers: [RatingPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
