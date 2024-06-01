import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { DogService } from './services/dog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public DogCategory: WritableSignal<string> = signal("");

  public DogCategories: Array<string>;

  public constructor(private questionService: DogService) {}

  public ngOnInit(): void {
    this.DogCategories = this.questionService.GetDogCategoriess();

    this.DogCategory.set(this.DogCategories[0])
  }
  
}
