import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { QuestionModel } from '../../models/question.model';
import { DogService } from '../../services/dog.service';

@Component({
  selector: 'app-dog-list',
  templateUrl: './dog-list.component.html',
  styleUrl: './dog-list.component.scss'
})
export class DogListComponent implements OnInit {

  public Dogs: WritableSignal<any | undefined> = signal(undefined);

  public constructor(private dogService: DogService) {}

  public ngOnInit(): void {
    this.LoadAllDogs();
  }

  public LoadAllDogs(): void {
    this.dogService.GetAllDogs().subscribe(
      {
        next: (response: QuestionModel | undefined) => {
          console.log('response = ', response);
          this.Dogs.set(response);
        },
        error: (error) => {
          console.log('error = ', error);
        }
      }
    );
  }

}
