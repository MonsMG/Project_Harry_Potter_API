import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HousesList } from '../../components/houses-list/houses-list'; // นำเข้า Component การ์ดบ้าน

@Component({
  selector: 'app-houses-list-page',
  imports: [HousesList],
  templateUrl: './houses-list-page.html',
  styleUrl: './houses-list-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// 🎯 หน้าแสดงรายชื่อบ้านทั้งหมด (ไม่มี Logic ซับซ้อนเพราะโยกไปไว้ใน Component ลูกหมดแล้ว)
export class HousesListPage {}
