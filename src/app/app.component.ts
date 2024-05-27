import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { QuestionService } from './services/question.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public CategoryOfQuestion: WritableSignal<string> = signal("");

  public QuestionCategories: Array<string>;

  public constructor(private questionService: QuestionService) {}

  public ngOnInit(): void {
    this.QuestionCategories = this.questionService.GetQuestionCategoriess();

    this.CategoryOfQuestion.set(this.QuestionCategories[0])
  }
}
