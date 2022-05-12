import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

import { DataService } from '../../services';
import { IPhoto } from '../../models';


@Component({
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {

  readonly photos$ = this.dataService.filteredPhotos$;
  readonly totalResults$ = this.dataService.totalResults$;

  constructor(
    @Inject(DataService) private readonly dataService: DataService,
  ) {}

  doFilter(filter: string): void {
    this.dataService.changeFilter(filter);
  }

  trackByFn(index: number, item: IPhoto): number {
    return item.id;
  }

}
