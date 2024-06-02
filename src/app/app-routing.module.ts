import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { LoginComponent } from "./authentication/login/login.component";
import { SignUpComponent } from "./authentication/sign-up/sign-up.component";
import { ProvidersMasterViewComponent } from "./client/providers-master-view/providers-master-view.component";
import { ClientEventsComponent } from './client/client-events/client-events.component';
import { ClientProfilePageComponent } from './client/client-profile-page/client-profile-page.component';
import { ProviderProfilePageComponent } from './provider/provider-profile-page/provider-profile-page.component';
import { ProviderCalendarComponent } from './provider/provider-calendar/provider-calendar.component';
import { ProviderInvoicesComponent } from './provider/provider-invoices/provider-invoices.component';
import { NewContractPageComponent } from './client/new-contract-page/new-contract-page.component';
import { ContractDetailsPageComponent } from './contract/contract-details-page/contract-details-page.component';
import { ContractOverviewTableComponent } from './contract/contract-overview-table/contract-overview-table.component';
import {
  ProviderClientsOverviewComponent
} from './provider/provider-clients-overview/provider-clients-overview.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'client/providers',
    component: ProvidersMasterViewComponent,
  },
  {
    path: 'client/contracts/:status',
    component: ContractOverviewTableComponent,
  },
  {
    path: 'client/events',
    component: ClientEventsComponent,
  },
  {
    path: 'client/profile',
    component: ClientProfilePageComponent,
  },
  {
    path: 'client/new-contract',
    component: NewContractPageComponent,
  },
  {
    path: 'contract/:id',
    component: ContractDetailsPageComponent,
  },
  {
    path: 'provider/contracts',
    component: ContractOverviewTableComponent,
  },
  {
    path: 'provider/my-clients',
    component: ProviderClientsOverviewComponent,
  },
  {
    path: 'provider/invoices',
    component: ProviderInvoicesComponent,
  },
  {
    path: 'provider/calendar',
    component: ProviderCalendarComponent,
  },
  {
    path: 'provider/profile',
    component: ProviderProfilePageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
