import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { QuestionModel } from '../models/question.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  http = inject(HttpClient);

  public QuestionCategoryies: Array<string> = [
    "artliterature",
    "language",
    "sciencenature",
    "general",
    "fooddrink",
    "peopleplaces",
    "geography",
    "historyholidays",
    "entertainment",
    "toysgames",
    "music",
    "mathematics",
    "religionmythology",
    "sportsleisure",
  ];

  public GetQuestionCategoriess(): Array<string> {
    return this.QuestionCategoryies.sort((a: string, b: string) => a.localeCompare(b));
  }
  
  public GetQuestionByCategory(category: string): Observable<QuestionModel | undefined> {
    const headers = {
      'X-Api-Key': environment.ApiKey,
    };

    return this.http.get<Array<QuestionModel>>('https://api.api-ninjas.com/v1/trivia?category='.concat(category), { headers: headers })
      .pipe(
        map((response: Array<QuestionModel>) => {
          return response[0];
        })
      );
  }
}
