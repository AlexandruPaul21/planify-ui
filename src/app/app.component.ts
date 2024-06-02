import { Component } from '@angular/core';
import { LoadingSpinnerQuery } from './reactivity/query/loading-spinner.query';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'planify-ui';

  public loading$ = this.loadingSpinnerQuery.select();

  public constructor(
    private loadingSpinnerQuery: LoadingSpinnerQuery
  ) {}
}
