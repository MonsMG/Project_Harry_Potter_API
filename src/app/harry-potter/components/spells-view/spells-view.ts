import { Component, input } from '@angular/core';
import { Spell } from '../../types/api';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-spells-view',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './spells-view.html',
  styleUrl: './spells-view.scss',
})
export class SpellsViewComponent {
  // รับข้อมูล List ของคาถามาจาก Page ด้วย Signal
  spells = input.required<Spell[]>();
}