import { ChangeDetectionStrategy, Component, resource, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { fetchAllSpells } from '../../helpers/resources';
import { Spell } from '../../types/api';
import { SpellsViewComponent } from '../../components/spells-view/spells-view';

@Component({
  selector: 'app-spells-list-page',
  standalone: true,
  imports: [FormsModule, SpellsViewComponent],
  templateUrl: './spells-list-page.html',
  styleUrl: './spells-list-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpellsListPage {
  searchQuery = signal<string>(''); // Signal สำหรับ Form ค้นหา

  spellsData = resource<Spell[], void>({
    loader: async () => await fetchAllSpells(), // เชื่อมต่อ API 
  });

  filteredSpells = computed(() => {
    const spells = this.spellsData.value() ?? [];
    const query = this.searchQuery().toLowerCase().trim();
    return spells.filter(s => s.name.toLowerCase().includes(query));
  });
}