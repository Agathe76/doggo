import { Component, InputSignal, input } from '@angular/core';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.scss'
})
export class TileComponent {
  public Name: InputSignal<string> = input.required<string>();
}
