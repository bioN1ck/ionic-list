import { InjectionToken, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export const PHOTO_ID_TOKEN = new InjectionToken<string>(
  'Photo ID from route param',
);

export function routeParamSnapshotFactory(
  paramKey: string,
): (injector: Injector) => string | null {
  return (injector: Injector): string | null => {
    return injector.get(ActivatedRoute).snapshot.paramMap.get(paramKey);
  };
}
