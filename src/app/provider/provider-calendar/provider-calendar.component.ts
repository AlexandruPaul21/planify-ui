import { Component } from '@angular/core';

@Component({
  selector: 'app-provider-calendar',
  templateUrl: './provider-calendar.component.html',
  styleUrls: ['./provider-calendar.component.scss']
})
export class ProviderCalendarComponent {
  public selectedDate: Date = new Date();
  public dates: Date[] = [new Date("2024-02-14"), new Date("2024-03-10")];

  public containsDate(date: any): boolean {
    return this.dates.find((actualDate) => this.equalDates(actualDate, date)) != null;
  }

  private equalDates(date1: Date, date2: any): boolean {
    return date1.getFullYear() === date2.year &&
      date1.getMonth() === date2.month &&
      date1.getDate() === date2.day;
  }
}
