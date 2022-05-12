import { ChangeDetectionStrategy, Component, Inject, Injector, OnInit } from '@angular/core';

import { PHOTO_ID_TOKEN, routeParamSnapshotFactory } from '../../tokens';
import { DataService } from '../../services';

@Component({
  templateUrl: './view-photo.page.html',
  styleUrls: ['./view-photo.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: PHOTO_ID_TOKEN,
      useFactory: routeParamSnapshotFactory('id'),
      deps: [Injector],
    }],
})
export class ViewPhotoPage implements OnInit {
  readonly photo$ = this.dataService.photo$;

  constructor(
    @Inject(DataService) private readonly dataService: DataService,
    @Inject(PHOTO_ID_TOKEN) private readonly id: string,
  ) { }

  ngOnInit() {
    this.dataService.changeSelectedPhoto(this.id);
  }
}
