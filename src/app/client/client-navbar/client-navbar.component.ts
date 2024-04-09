import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from "@angular/router";

@Component({
    selector: 'client-navbar',
    templateUrl: './client-navbar.component.html',
    styleUrls: ['./client-navbar.component.scss']
})
export class ClientNavbarComponent {
    public constructor(
        private router: Router,
    ) {
    }

    public clientMenuItems: MenuItem[] = [
        {
            label: 'Profile',
            icon: 'pi pi-user',
            routerLink: '/client/profile'
        },
        {
            label: 'Providers',
            icon: 'pi pi-users',
            routerLink: '/client/providers'
        },
        {
            label: 'Events',
            icon: 'pi pi-gift',
            routerLink: '/client/events'
        },
        {
            label: 'Contracts',
            icon: 'pi pi-briefcase',
            items: [
                {
                    label: 'In progress',
                    routerLink: '/client/contracts'
                },
                {
                    label: 'Finished',
                    routerLink: '/client/contracts'
                }
            ]
        }
    ]

    public async onLogoutPressed(): Promise<void> {
        localStorage.clear();
        await this.router.navigate(['/login']);
    }
}
