import { Component, OnInit } from '@angular/core';
import { EventDto } from '../../integration/domain/EventDto';
import { ServiceDto } from '../../integration/domain/ServiceDto';
import { EventService } from '../../integration/service/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-events',
  templateUrl: './client-events.component.html',
  styleUrls: ['./client-events.component.scss']
})
export class ClientEventsComponent implements OnInit {
  public availableEvents: EventDto[] = [];
  public selectedEvent: EventDto | null = null;

  public services: ServiceDto[] = [];

  public constructor(
    private eventService: EventService,
    private router: Router,
  ) {}

  public async ngOnInit(): Promise<void> {
    this.availableEvents = await this.eventService.getAllEvents();
  }

  public onEventSelectedChange(): void {
    this.services = this.selectedEvent?.services ?? [];
  }

  public async onSeeProvidersClicked(serviceName: string): Promise<void> {
    await this.router.navigate(['/client/providers'], { queryParams: { service: serviceName } });
  }
}
