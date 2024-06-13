import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public IsVisible: boolean = false;

  public constructor(public router: Router) {}

  public GoToHome(): void {
    this.router.navigate(['']);
  }
}
