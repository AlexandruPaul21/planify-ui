import { Component, OnInit, Provider } from '@angular/core';
import { ServiceService } from "../../integration/service/service.service";
import { ServiceDto } from "../../integration/domain/ServiceDto";
import { ProviderDto } from "../../integration/domain/ProviderDto";
import { Router } from "@angular/router";
import { ProviderService } from "../../integration/service/provider.service";
import { MessageService } from "primeng/api";

@Component({
    selector: 'app-provider-profile-page',
    templateUrl: './provider-profile-page.component.html',
    styleUrls: ['./provider-profile-page.component.scss'],
    providers: [MessageService],
})
export class ProviderProfilePageComponent implements OnInit {
    public editMode = false;
    public existingServices: ServiceDto[] = [];

    public servicesString: string[] = []
    public selectedServices: string[] = [];

    public provider: ProviderDto = {
        id: '',
        name: '',
        username: '',
        email: '',
        revenue: 0,
        offeredServices: [],
        fiscalCode: '',
        address: '',
        phoneNumber: '',
        rating: 0,
        createdAt: new Date()
    };

    public constructor(
        private serviceService: ServiceService,
        private router: Router,
        private providerService: ProviderService,
        private messageService: MessageService,
    ) {
    }

    public async ngOnInit(): Promise<void> {
        this.existingServices = await this.serviceService.getAllServices();
        this.servicesString = this.existingServices.map(service => service.serviceName);

        const providerId = localStorage.getItem('id');
        if (providerId == null) {
            await this.redirectToLogin();
            return;
        }

        try {
            this.provider = await this.providerService.getById(providerId);
            this.selectedServices = this.provider.offeredServices.map(service => service.serviceName);
        } catch (e: any) {
            await this.redirectToLogin();
        }
    }

    private async redirectToLogin(): Promise<void> {
        await this.router.navigate(['/login'])
    }

    public async onCancelClicked(): Promise<void> {
        await this.ngOnInit();
        this.editMode = false;
    }

    public async onSaveClicked(): Promise<void> {
        try {
            await this.providerService.update(this.provider.id, this.provider);
            this.editMode = false;
            this.messageService.add({
                severity: 'success',
                summary: 'Update successful',
                detail: 'User details have been update successfully'
            });
        } catch (e: any) {
            if (e['status'] === 401 || e['status'] === 403) {
                await this.redirectToLogin();
            } else {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Update failed',
                    detail: 'There was an error. Please try again!'
                });
            }
        }
    }
}
