import { Component, inject, resource } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { fetchSpellById } from '../../helpers/resources';

@Component({
  selector: 'app-spells-view-page',
  standalone: true,
  imports: [],
  templateUrl: './spells-view-page.html',
  styleUrl: './spells-view-page.scss',
})
export class SpellsViewPage {
  private route = inject(ActivatedRoute);
  private location = inject(Location);

  // ดึงรหัสคาถา (ID) จาก URL ปัจจุบัน เพื่อนำไปดึงข้อมูลคาถานั้นๆ
  spellId = this.route.snapshot.paramMap.get('id') ?? '';

  goBack() {
    this.location.back();
  }

  // จัดการดึงข้อมูลคาถาอัตโนมัติตาม spellId ผ่าน API
  spellData = resource({
    params: () => this.spellId, // กำหนดค่า parameter เป็น ID ของคาถา
    loader: async ({ params }) => await fetchSpellById(params), // ฟังก์ชันที่จะไปเรียก API เพื่อขอข้อมูล
  });
}