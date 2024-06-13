import { ChangeDetectionStrategy, Component, InputSignal, input } from '@angular/core';
import { DogModel } from '../../models/dog.model';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TileComponent {
  public Dog: InputSignal<DogModel> = input.required<DogModel>();
}
