import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { QuestionModel } from '../models/question.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DogService {
  http = inject(HttpClient);

  public DogCategoryies: Array<string> = [
    "golden retriever",
    "australian stumpy tail cattle dog"
  ];

  public GetDogCategoriess(): Array<string> {
    return this.DogCategoryies.sort((a: string, b: string) => a.localeCompare(b));
  }

  public GetDogByCategory(name: string): Observable<any | undefined> {
    const headers = {
      'X-Api-Key': environment.ApiKey,
    };

    return this.http.get<Array<QuestionModel>>('https://api.api-ninjas.com/v1/dogs?name='.concat(encodeURI(name)), { headers: headers })
      /*.pipe(
        map((response: Array<QuestionModel>) => {
          return response[0];
        }
      )
    )*/;
  }

  public GetAllDogs(): Observable<any | undefined> {
    const headers = {
      'X-Api-Key': environment.ApiKey,
    };

    return this.http.get<Array<QuestionModel>>('https://api.api-ninjas.com/v1/dogs?energy=5', { headers: headers })
      /*.pipe(
        map((response: Array<QuestionModel>) => {
          return response[0];
        }
      )
    )*/;
  }
}
