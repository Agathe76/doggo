import { Router } from '@angular/router';
import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import { DogService } from '../../services/dog.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { DogModel } from '../../models/dog.model';

@Component({
  selector: 'app-dog-list',
  templateUrl: './dog-list.component.html',
  styleUrl: './dog-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DogListComponent {
  public Dogs: Signal<Array<DogModel>> = toSignal(this.dogService.AllDogsFiltered$, { initialValue: [] });

  public constructor(public dogService: DogService, public router: Router) {}
 
  public GoToDogDetails(dog: DogModel): void {
    this.dogService.SelectedDogDetails.set(dog);
    this.router.navigate(['/', 'dog-details', dog.name]);
    // TODO resolver to load dog name before accessing to route and get dog from service in dog details component
  }
}
