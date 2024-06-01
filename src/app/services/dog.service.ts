import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { DogModel } from '../models/dog.model';

@Injectable({
  providedIn: 'root'
})
export class DogService {
  http = inject(HttpClient);

  public SelectedDogName: WritableSignal<string> = signal('');

  public Filters: WritableSignal<string> = signal('');

  public SelectedDogEnergyLevel: WritableSignal<number> = signal(1);

  public AllDogs$: Observable<Array<DogModel>> = this.GetAllDogs();

  public AllDogsFiltered$: Observable<Array<DogModel>> = toObservable(this.SelectedDogName).pipe(
    switchMap((name: string) => {
      if (name?.length > 0) {
        return this.GetDogByName(name);
      } else {
        return this.GetAllDogs();
      }
    }),
  );

  public DogCategoryies: Array<string> = [
    "golden retriever",
    "australian stumpy tail cattle dog"
  ];

  public GetAllDogNames(): Array<string> {
    return this.DogCategoryies.sort((a: string, b: string) => a.localeCompare(b));
  }

  public GetDogByName(name: string): Observable<Array<DogModel>> {
    const headers = {
      'X-Api-Key': environment.ApiKey,
    };

    return this.http.get<Array<DogModel>>('https://api.api-ninjas.com/v1/dogs?name='.concat(encodeURI(name)), { headers: headers });
  }

  public GetAllDogs(): Observable<Array<DogModel>> {
    const headers = {
      'X-Api-Key': environment.ApiKey,
    };

    return forkJoin([
      this.http.get<Array<DogModel>>('https://api.api-ninjas.com/v1/dogs?energy=1', { headers: headers }),
      this.http.get<Array<DogModel>>('https://api.api-ninjas.com/v1/dogs?energy=2', { headers: headers }),
      this.http.get<Array<DogModel>>('https://api.api-ninjas.com/v1/dogs?energy=3', { headers: headers }),
      this.http.get<Array<DogModel>>('https://api.api-ninjas.com/v1/dogs?energy=4', { headers: headers }),
      this.http.get<Array<DogModel>>('https://api.api-ninjas.com/v1/dogs?energy=5', { headers: headers })
    ]).pipe(
      map((results: Array<Array<DogModel>>) => {
        return results[0].concat(results[1]).concat(results[2]).concat(results[3]).concat(results[4]);
      })
    );
  }

  public GetDogsByEnergy(energy: number): Observable<Array<DogModel>> {
    const headers = {
      'X-Api-Key': environment.ApiKey,
    };

    return this.http.get<Array<DogModel>>('https://api.api-ninjas.com/v1/dogs?energy=5', { headers: headers });
  }
}
