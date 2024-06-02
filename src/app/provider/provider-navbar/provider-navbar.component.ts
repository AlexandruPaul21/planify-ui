import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from "@angular/router";

@Component({
  selector: 'provider-navbar',
  templateUrl: './provider-navbar.component.html',
  styleUrls: ['./provider-navbar.component.scss'],
})
export class ProviderNavbarComponent {
  public constructor(
    private router: Router,
  ) {}

  public providerMenuItems: MenuItem[] = [
    {
      label: 'Profile',
      icon: 'pi pi-user',
      routerLink: '/provider/profile',
    },
    {
      label: 'Calendar',
      icon: 'pi pi-calendar',
      routerLink: '/provider/calendar',
    },
    {
      label: 'My Clients',
      icon: 'pi pi-users',
      routerLink: '/provider/my-clients',
    },
    {
      label: 'Documents',
      icon: 'pi pi-inbox',
      items: [
        {
          label: 'Invoices',
          icon: 'pi pi-euro',
          routerLink: '/provider/invoices',
        },
        {
          label: 'Contracts',
          icon: 'pi pi-file',
          routerLink: '/provider/contracts',
        },
      ],
    },
  ]

  public async onLogoutPressed(): Promise<void> {
    localStorage.clear();
    await this.router.navigate(['/login']);
  }
}
