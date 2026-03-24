import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Spell } from '../../types/api';
import { SpellsViewComponent } from '../spells-view/spells-view'; // นำเข้าตัววน Loop

@Component({
  selector: 'app-spells-list',
  standalone: true,
  imports: [SpellsViewComponent], // ใช้ SpellsView ในการแสดงรายการ
  templateUrl: './spells-list.html',
  styleUrl: './spells-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpellsList {
  // รับข้อมูลมาจาก Page เพื่อส่งต่อให้ spells-view
  spells = input.required<Spell[]>();
}