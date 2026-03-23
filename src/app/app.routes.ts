import { Routes } from '@angular/router';
import { HarryPotterRoot } from './harry-potter/pages/harry-potter-root/harry-potter-root';
import { HomePage } from './harry-potter/pages/home-page/home-page';
import { CharactersListPage } from './harry-potter/pages/characters-list-page/characters-list-page';
import { CharacterViewPage } from './harry-potter/pages/character-view-page/character-view-page';
import { HousesListPage } from './harry-potter/pages/houses-list-page/houses-list-page';
import { HousesViewPage } from './harry-potter/pages/houses-view-page/houses-view-page';
import { SpellsListPage } from './harry-potter/pages/spells-list-page/spells-list-page';
import { SpellsViewPage } from './harry-potter/pages/spells-view-page/spells-view-page';
import { SortingHatPage } from './harry-potter/pages/sorting-hat-page/sorting-hat-page';

export const routes: Routes = [
  {
    path: '',
    component: HarryPotterRoot,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomePage },
      { path: 'characters', component: CharactersListPage },
      { path: 'characters/:id', component: CharacterViewPage },
      { path: 'houses', component: HousesListPage },
      { path: 'houses/:house', component: HousesViewPage },
      { path: 'spells', component: SpellsListPage },
      { path: 'spells/:id', component: SpellsViewPage },
      { path: 'sorting-hat', component: SortingHatPage },
    ],
  },
];
