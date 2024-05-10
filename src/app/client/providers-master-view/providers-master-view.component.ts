import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../integration/service/service.service';
import { ServiceDto } from '../../integration/domain/ServiceDto';
import { ProviderDto } from '../../integration/domain/ProviderDto';
import { ProviderService } from '../../integration/service/provider.service';
import { ActivatedRoute, Router } from '@angular/router';
import { promiseFromObservable } from '../../integration/utils/rest-utils';

@Component({
  selector: 'app-providers-master-view',
  templateUrl: './providers-master-view.component.html',
  styleUrls: ['./providers-master-view.component.scss'],
})
export class ProvidersMasterViewComponent implements OnInit {
  public availableServices: ServiceDto[] = [];
  public selectedService: ServiceDto | null = null;

  public providers: ProviderDto[] = [];
  public loading: boolean = false;

  public constructor(
    private serviceService: ServiceService,
    private providerService: ProviderService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  public async ngOnInit(): Promise<void> {
    this.loading = true;
    this.availableServices = await this.serviceService.getAllServices();

    const q = await promiseFromObservable(this.route.queryParams);
    if (q['service'] != null) {
      this.selectedService = this.availableServices.find(service => service.serviceName === q['service'])!!;
      await this.onServiceSelectionChange();
    }
    this.loading = false;
  }

  public async onServiceSelectionChange(): Promise<void> {
    this.loading = true;
    if (this.selectedService == null) {
      this.providers = [];
      this.loading = false;
      return;
    }
    this.providers = await this.providerService.getByServiceOffered(this.selectedService);
    this.loading = false;
  }

  public getOfferedServicesString(provider: ProviderDto): string {
    return provider.offeredServices
    .map(service => service.serviceName)
    .reduce((a, b) => a + ', ' + b);
  }

  public async onContactProviderClicked(provider: ProviderDto): Promise<void> {
    await this.router.navigate(['/client/new-contract'], {
      queryParams: { username: provider.username },
    });
  }
}
