import { Component, InputSignal, OnInit, Signal, WritableSignal, computed, input, signal } from '@angular/core';
import { DogService } from '../../services/dog.service';
import { QuestionModel } from '../../models/question.model';

@Component({
  selector: 'app-dog-details',
  templateUrl: './dog-details.component.html',
  styleUrl: './dog-details.component.scss',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DogDetailsComponent implements OnInit {

  public Category: InputSignal<string> = input.required<string>();

  public DogDetails: Signal<any> = computed(() => this.LoadDogByType());

  public constructor(private dogService: DogService) {}

  public Dog: WritableSignal<any | undefined> = signal(undefined);

  public ngOnInit(): void {
    this.LoadDogByType();

    // this.LoadAllDogs();
  }

  public LoadDogByType(): void {
    this.dogService.GetDogByCategory(this.Category()).subscribe(
      {
        next: (response: QuestionModel | undefined) => {
          console.log('response = ', response);
          this.Dog.set(response);
        },
        error: (error) => {
          console.log('error = ', error);
        }
      }
    );
  }

}

