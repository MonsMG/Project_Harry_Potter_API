import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-houses-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './houses-list.html',
  styleUrl: './houses-list.scss',
})
// Component ย่อย (ลูก) สำหรับแสดงรายชื่อบ้านทั้ง 4 หลังเป็นรูปแบบการ์ด
export class HousesList {
}
