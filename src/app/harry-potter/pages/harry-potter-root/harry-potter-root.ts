import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-harry-potter-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './harry-potter-root.html',
  styleUrl: './harry-potter-root.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HarryPotterRoot {
  protected readonly title = signal('Harry Potter Land');
}
