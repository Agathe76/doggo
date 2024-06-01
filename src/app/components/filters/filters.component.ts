import { Component } from '@angular/core';
import { DogService } from '../../services/dog.service';

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
}
