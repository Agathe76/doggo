import { Component, InputSignal, Signal, WritableSignal, computed, input, signal } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { QuestionModel } from '../../models/question.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionComponent {

  public Category: InputSignal<string> = input.required<string>();

  public constructor(private questionService: QuestionService) {}

  public Question: WritableSignal<QuestionModel | undefined> = signal(undefined);

  public LoadQuestion(): void {
    this.questionService.GetQuestionByCategory(this.Category()).subscribe(
      {
        next: (response: QuestionModel | undefined) => {
          console.log('response = ', response);
          this.Question.set(response);
        }, 
        error: (error) => {
          console.log('error = ', error);
        }
      }
    );
  }

}

