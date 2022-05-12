import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IPhoto } from '../../models';

@Component({
  selector: 'app-photo-item',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoComponent {
  @Input() photo: IPhoto;
}
