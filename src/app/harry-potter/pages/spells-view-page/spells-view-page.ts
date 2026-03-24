import { Component, inject, resource } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { fetchSpellById } from '../../helpers/resources';

@Component({
  selector: 'app-spells-view-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './spells-view-page.html',
  styleUrl: './spells-view-page.scss',
})
export class SpellsViewPage {
  private route = inject(ActivatedRoute);
  spellId = this.route.snapshot.paramMap.get('id') ?? ''; // ดึง ID จาก Route 

  spellData = resource({
    params: () => this.spellId,
    loader: async ({ params }) => await fetchSpellById(params),
  });
}