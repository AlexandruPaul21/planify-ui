import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PlanifyErrorHandler extends ErrorHandler {
  public constructor(
    private router: Router,
    private zone: NgZone,
  ) { super(); }

  public override async handleError(error: any): Promise<void> {
    if (error.code === -100) {
      return ;
    }
    await this.zone.run(async () => await this.router.navigate(['/login'], { queryParams: { redirected: true }}));
  }
}
