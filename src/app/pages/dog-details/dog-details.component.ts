import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DogService } from '../../services/dog.service';

@Component({
  selector: 'app-dog-details',
  templateUrl: './dog-details.component.html',
  styleUrl: './dog-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DogDetailsComponent {
  public constructor(public dogService: DogService) {}
}
