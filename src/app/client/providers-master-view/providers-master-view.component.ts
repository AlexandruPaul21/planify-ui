import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../integration/service/service.service';
import { ServiceDto } from '../../integration/domain/ServiceDto';
import { ProviderDto } from '../../integration/domain/ProviderDto';
import { ProviderService } from '../../integration/service/provider.service';
import { ActivatedRoute } from '@angular/router';
import { promiseFromObservable } from '../../integration/utils/rest-utils';

@Component({
  selector: 'app-providers-master-view',
  templateUrl: './providers-master-view.component.html',
  styleUrls: ['./providers-master-view.component.scss']
})
export class ProvidersMasterViewComponent implements OnInit {
  public availableServices: ServiceDto[] = [];
  public selectedService: ServiceDto | null = null;

  public providers: ProviderDto[] = [];

  public constructor(
    private serviceService: ServiceService,
    private providerService: ProviderService,
    private route: ActivatedRoute,
  ) {}

  public async ngOnInit(): Promise<void> {
    this.availableServices = await this.serviceService.getAllServices();

    const q = await promiseFromObservable(this.route.queryParams);
    if (q['service'] != null) {
      this.selectedService = this.availableServices.find(service => service.serviceName === q['service'])!!;
      await this.onServiceSelectionChange();
    }
  }

  public async onServiceSelectionChange(): Promise<void> {
    if (this.selectedService == null) {
      this.providers = [];
      return ;
    }
    this.providers = await this.providerService.getByServiceOffered(this.selectedService);
  }

  public getOfferedServicesString(provider: ProviderDto): string {
    return provider.offeredServices
                .map(service => service.serviceName)
                .reduce((a, b) => a + ', ' + b);
  }
}
