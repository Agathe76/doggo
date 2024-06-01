import { Router } from '@angular/router';
import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import { DogService } from '../../services/dog.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { DogModel } from '../../models/dog.model';
import { FilterModel } from '../../models/filter.model';

@Component({
  selector: 'app-dog-list',
  templateUrl: './dog-list.component.html',
  styleUrl: './dog-list.component.scss',
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class DogListComponent {
  // public Filters: Signal<FilterModel> = this.dogService.Filters;

  public Dogs: Signal<Array<DogModel>> = toSignal(this.dogService.AllDogsFiltered$, { initialValue: [] });

  public constructor(public dogService: DogService, public router: Router) {}
 
  public GoToDogDetails(dogName: string): void {
    // this.dogService.SelectedDogName.set(dogName);
    this.router.navigate(['/', 'dog-details', dogName]);
    // TODO resolver to load dog name before accessing to route and get dog from service in dog details component
  }
}
