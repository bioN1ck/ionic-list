import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { debounceTime, filter, map, shareReplay, switchMap } from 'rxjs/operators';

import { IPhoto } from '../models';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  // Filter criteria
  private readonly filterSubject = new BehaviorSubject<string>('');
  private readonly filterAction$ = this.filterSubject.asObservable();

  // Photos server API
  private readonly photoUrl = 'https://jsonplaceholder.typicode.com/photos';
  private readonly allPhotos$: Observable<IPhoto[]> = this.http.get<IPhoto[]>(this.photoUrl).pipe(
    shareReplay(1),
  );

  readonly filteredPhotos$ = combineLatest([
    this.allPhotos$,
    this.filterAction$.pipe(debounceTime(500)),
  ]).pipe(
    map(([photos, filterBy]) => this.performFilter(photos, filterBy))
  );

  // Total photos
  readonly totalResults$ = this.filteredPhotos$.pipe(
    map((photos) => photos.length),
  );

  // Handle photo selection action
  private readonly photoSelectedSubject = new BehaviorSubject<string | null>(null);
  private readonly photoSelectedAction$ = this.photoSelectedSubject.asObservable();

  readonly photo$ = this.photoSelectedAction$.pipe(
    filter<string>(Boolean),
    switchMap((selectedId: string) =>
      this.http.get<IPhoto>(`${this.photoUrl}/${selectedId}`),
    ),
  );

  constructor(
    @Inject(HttpClient) private readonly http: HttpClient,
  ) { }

  changeFilter(filterBy: string): void {
    this.filterSubject.next(filterBy);
  }

  changeSelectedPhoto(selectedPhotoId: string): void {
    this.photoSelectedSubject.next(selectedPhotoId);
  }

  private performFilter(photos: IPhoto[], filterBy: string): IPhoto[] {
    filterBy = filterBy.toLocaleLowerCase();
    return photos.filter(
      (photo: IPhoto) => photo.title.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }
}
