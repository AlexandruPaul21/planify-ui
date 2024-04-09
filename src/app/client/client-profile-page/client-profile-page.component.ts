import { Component, OnInit } from '@angular/core';
import { ClientDto } from "../../integration/domain/ClientDto";
import { Router } from "@angular/router";
import { ClientService } from "../../integration/service/client.service";
import { MessageService } from "primeng/api";

@Component({
    selector: 'app-client-profile-page',
    templateUrl: './client-profile-page.component.html',
    styleUrls: ['./client-profile-page.component.scss'],
    providers: [MessageService]
})
export class ClientProfilePageComponent implements OnInit {
    public editMode = false;

    public client: ClientDto = {
        id: '',
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        address: '',
        phoneNumber: '',
        rating: 0,
        budget: 0,
        createdAt: new Date(),
    }

    public constructor(
        private router: Router,
        private clientService: ClientService,
        private messageService: MessageService,
    ) {
    }

    public async ngOnInit(): Promise<void> {
        const clientId = localStorage.getItem('id');

        if (clientId == null) {
            await this.redirectToLogin();
            return;
        }

        try {
            this.client = await this.clientService.getById(clientId);
        } catch (e: any) {
            await this.redirectToLogin();
        }
    }

    public async onCancelClicked(): Promise<void> {
        await this.ngOnInit();
        this.editMode = false;
    }

    private async redirectToLogin(): Promise<void> {
        try {
            await this.router.navigate(['/login']);
        } catch (e) {

        }
        this.editMode = false;
    }

    public async onSaveClicked(): Promise<void> {
        try {
            await this.clientService.update(this.client.id, this.client);
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
