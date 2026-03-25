import { Component, inject, resource } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { fetchCharacterById } from '../../helpers';
import { CharacterView } from '../../components/character-view/character-view';

@Component({
  selector: 'app-character-view-page',
  standalone: true,
  imports: [CharacterView],
  templateUrl: './character-view-page.html',
  styleUrls: ['./character-view-page.scss'],
})
export class CharacterViewPage {
  private route = inject(ActivatedRoute);
  private location = inject(Location);

  // 🎯 ดึงรหัสตัวละคร (ID) จาก URL ปัจจุบัน เพื่อนำไปดึงข้อมูลตัวละครนั้นๆ
  readonly characterId = this.route.snapshot.paramMap.get('id') ?? '';

  goBack() {
    this.location.back();
  }

  // 🎯 ใช้ resource() โหลดข้อมูลตัวละครจาก API แบบอัตโนมัติ ตาม characterId
  readonly characterData = resource({
    params: () => this.characterId, // ส่ง ID อัปเดตเข้าไปใน Loader
    loader: async ({ params }) => {
      const res = await fetchCharacterById(params); // เรียก API
      return res[0]; // 🪄 ดึงเอา Object ตัวละครตัวแรกออกมาจาก Array ที่ API ส่งมาให้
    },
  });
}
