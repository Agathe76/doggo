import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, forkJoin, map, tap } from 'rxjs';
import { DogModel } from '../models/dog.model';
import { FilterModel } from '../models/filter.model';

@Injectable({
  providedIn: 'root'
})
export class DogService {
  http = inject(HttpClient);

  public SelectedDogDetails: WritableSignal<DogModel | undefined> = signal(undefined);

  public AllDogsFiltered: WritableSignal<Array<DogModel>> = signal<Array<DogModel>>([]);

  public DogNames: Array<string> = [
    "golden retriever",
    "australian stumpy tail cattle dog"
  ];

  public GetAllDogNames(): Array<string> {
    return this.DogNames.sort((a: string, b: string) => a.localeCompare(b));
  }
  
  public GetDogByName(name: string): Observable<DogModel> {
    const headers = {
      'X-Api-Key': environment.ApiKey,
    };

    // no get all in api    
    return this.http.get<Array<DogModel>>('https://api.api-ninjas.com/v1/dogs?name='.concat(encodeURI(name)), { headers: headers })
      .pipe(
        map((dogs: Array<DogModel>) => {
          return dogs[0];
        }),
        tap((dog: DogModel) => {
          this.SelectedDogDetails.set(dog);
        })
      );
  }

  public UpdateCurrentDogList(filters: FilterModel): Observable<Array<DogModel>> {
    if (this.MapFiltersToParam(filters).length === 0) {
      return this.GetAllDogs().pipe(
        tap((resultsSorted: Array<DogModel>) => {
          this.AllDogsFiltered.set(resultsSorted);
        })
      )
    } else {
      return this.GetAllWithFilters(filters).pipe(
        tap((resultsSorted: Array<DogModel>) => {
          this.AllDogsFiltered.set(resultsSorted);
        })
      );
    }
  }

  private GetAllWithFilters(filters: FilterModel): Observable<Array<DogModel>> {
    const headers = {
      'X-Api-Key': environment.ApiKey,
    };

    return this.http.get<Array<DogModel>>('https://api.api-ninjas.com/v1/dogs?'.concat(this.MapFiltersToParam(filters)), { headers: headers })
      .pipe(
        map((results: Array<DogModel>) => {
          return results.sort((a: DogModel, b: DogModel) => a.name.localeCompare(b.name))
        })
      );
  }

  private GetAllDogs(): Observable<Array<DogModel>> {
    const headers = {
      'X-Api-Key': environment.ApiKey,
    };

    // no get all in api    
    return forkJoin([
      this.http.get<Array<DogModel>>('https://api.api-ninjas.com/v1/dogs?energy=1', { headers: headers }),
      this.http.get<Array<DogModel>>('https://api.api-ninjas.com/v1/dogs?energy=2', { headers: headers }),
      this.http.get<Array<DogModel>>('https://api.api-ninjas.com/v1/dogs?energy=3', { headers: headers }),
      this.http.get<Array<DogModel>>('https://api.api-ninjas.com/v1/dogs?energy=4', { headers: headers }),
      this.http.get<Array<DogModel>>('https://api.api-ninjas.com/v1/dogs?energy=5', { headers: headers })
    ]).pipe(
      map((results: Array<Array<DogModel>>) => {
        return results[0].concat(results[1]).concat(results[2]).concat(results[3]).concat(results[4])
          .sort((a: DogModel, b: DogModel) => a.name.localeCompare(b.name));
      })
    );
  }

  private MapFiltersToParam(filters: FilterModel): string {
    let params: string = '';

    if (filters.name !== '') {
      params = params.concat("name=").concat(filters.name).concat(";");
    }

    if (filters.energy !== -1) {
      params = params.concat("energy=").concat(filters.energy.toString()).concat(";");
    }

    if (filters.protectiveness !== -1) {
      params = params.concat("protectiveness=").concat(filters.protectiveness.toString()).concat(";");
    }

    return params;
  }
}
