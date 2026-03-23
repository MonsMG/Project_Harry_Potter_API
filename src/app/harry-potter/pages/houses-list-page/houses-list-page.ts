import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HousesList } from '../../components/houses-list/houses-list'; // นำเข้า Component การ์ดบ้าน

@Component({
  selector: 'app-houses-list-page',
  imports: [HousesList],
  templateUrl: './houses-list-page.html',
  styleUrl: './houses-list-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HousesListPage {}
