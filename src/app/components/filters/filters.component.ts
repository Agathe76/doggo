import { Component, Signal } from '@angular/core';
import { DogService } from '../../services/dog.service';
import { FilterModel } from '../../models/filter.model';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {
  public AllDogNames: Array<string>;
  public AllDogEnergyLevels: Array<number> = [ 1, 2, 3, 4, 5 ];

  public constructor(public dogService: DogService) {}
  
  public ngOnInit(): void {
    this.AllDogNames = this.dogService.GetAllDogNames();
  }

  public SetName(name: string): void {
    this.dogService.Filters.set({...this.dogService.Filters(), name: name});
  }

  public SetEnergyLevel(energyLevel: number): void {
    this.dogService.Filters.set({...this.dogService.Filters(), energyLevel: energyLevel});
  }
}
