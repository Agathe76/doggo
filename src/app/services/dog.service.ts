import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { DogModel } from '../models/dog.model';
import { FilterModel } from '../models/filter.model';

@Injectable({
  providedIn: 'root'
})
export class DogService {
  http = inject(HttpClient);

  public SelectedDogName: WritableSignal<string> = signal('');

  public Filters: WritableSignal<FilterModel> = signal({
    name: '',
    energyLevel: -1,
  });

  public SelectedDogEnergyLevel: WritableSignal<number> = signal(1);

  public AllDogs$: Observable<Array<DogModel>> = this.GetAllDogs();

  public AllDogsFiltered$: Observable<Array<DogModel>> = toObservable(this.Filters).pipe(
    switchMap((filters: FilterModel) => {

      console.log('filters ', filters);

      let params: string = '';

      if (filters.name !== '') {
        params = params.concat("name=").concat(filters.name);
      }

      if (filters.energyLevel !== -1) {
        params = params.concat("energy=").concat(filters.energyLevel.toString());
      }

      if (params.length > 0) {
        return this.GetDogsFiltered(params);
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

  public GetDogsFiltered(params: string): Observable<Array<DogModel>> {
    const headers = {
      'X-Api-Key': environment.ApiKey,
    };

    return this.http.get<Array<DogModel>>('https://api.api-ninjas.com/v1/dogs?'.concat(params), { headers: headers });
  }
}
