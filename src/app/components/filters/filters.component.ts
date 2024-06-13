import { ChangeDetectionStrategy, Component, Signal, WritableSignal, computed, effect, signal } from '@angular/core';
import { DogService } from '../../services/dog.service';
import { FilterModel } from '../../models/filter.model';
import { tap } from 'rxjs';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent {
  public AllDogNames: Array<string>;
  public OneToFiveList: Array<number>;

  public DogName: WritableSignal<string> = signal('');
  public DogEnergyLevel: WritableSignal<number> = signal(-1);
  public DogProtectiveNessLevel: WritableSignal<number> = signal(-1);

  public Filters: Signal<FilterModel> = computed(() => {
    return {
      name: this.DogName(),
      energy: this.DogEnergyLevel(),
      protectiveness: this.DogProtectiveNessLevel(),
    }
  });

  public constructor(public dogService: DogService) {
    effect(() => {
      console.log('update of Filters ', this.Filters());
      this.dogService.UpdateCurrentDogList(this.Filters()).subscribe();
    });
  }

  public ngOnInit(): void {
    this.AllDogNames = this.dogService.GetAllDogNames();
    this.OneToFiveList = [ 1, 2, 3, 4, 5 ];
  }

  public ResetFilters(): void {
    this.DogName.set('');
    this.DogEnergyLevel.set(-1);
  }
}
