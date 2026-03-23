import { Component, inject, resource } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { fetchCharactersByHouse } from '../../helpers/resources';
import { HousesView } from '../../components/houses-view/houses-view'; // นำเข้า Component ลูก
import { Character } from '../../types/api';

@Component({
  selector: 'app-houses-view-page',
  standalone: true,
  imports: [RouterLink, HousesView], // ยัด HousesView ใส่ imports เพื่อให้ใช้งาน <app-houses-view> ใน HTML ได้
  templateUrl: './houses-view-page.html',
  styleUrl: './houses-view-page.scss',
})
export class HousesViewPage {
  // ดึงเครื่องมืออ่านค่าพารามิเตอร์จาก URL
  private route = inject(ActivatedRoute);

  // สกัดชื่อบ้านออกจาก URL (เช่น /houses/gryffindor)
  houseName = this.route.snapshot.paramMap.get('house') ?? 'gryffindor';

  // 🎯 ใช้ resource() กับ async/await จัดการ API ดึงข้อมูลตามชื่อบ้านได้ถูกต้องและสมบูรณ์
  charactersData = resource<Character[], string>({
    params: () => this.houseName,
    loader: async ({ params }) => await fetchCharactersByHouse(params),
  });
}
