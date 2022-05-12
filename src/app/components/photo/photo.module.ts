import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { PhotoComponent } from './photo.component';

@NgModule({
  declarations: [PhotoComponent],
  exports: [PhotoComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
  ]
})
export class PhotoModule { }
