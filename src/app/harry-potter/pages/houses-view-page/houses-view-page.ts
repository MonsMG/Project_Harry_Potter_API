import { Component, inject, resource, signal, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { fetchCharactersByHouse } from '../../helpers/resources';
import { HousesView } from '../../components/houses-view/houses-view'; // นำเข้า Component ลูก
import { Character } from '../../types/api';

@Component({
  selector: 'app-houses-view-page',
  standalone: true,
  imports: [HousesView], // ยัด HousesView ใส่ imports เพื่อให้ใช้งาน <app-houses-view> ใน HTML ได้
  templateUrl: './houses-view-page.html',
  styleUrl: './houses-view-page.scss',
})
export class HousesViewPage {
  // ดึงเครื่องมืออ่านค่าพารามิเตอร์จาก URL
  private route = inject(ActivatedRoute);
  private location = inject(Location);

  // 🎯 ดึงชื่อบ้านออกจาก URL ปัจจุบัน (เช่น ถ้าเป็น /houses/gryffindor ก็จะได้คำว่า gryffindor)
  houseName = this.route.snapshot.paramMap.get('house') ?? 'gryffindor';

  // 🎯 ตัวแปร Signal สำหรับควบคุมการทำงานของการแบ่งหน้า (Pagination)
  currentPage = signal(1); // ตำแหน่งหน้าปัจจุบัน
  readonly pageSize = 20; // จำนวนตัวละครที่จะแสดงต่อหนึ่งหน้า

  goBack() {
    this.location.back();
  }

  // 🎯 ดึงข้อมูลตัวละครในบ้านจาก API อัตโนมัติ โดยอิงตามชื่อบ้าน (houseName)
  charactersData = resource<Character[], string>({
    params: () => this.houseName, // ส่งชื่อบ้านไปให้ Loader
    loader: async ({ params }) => await fetchCharactersByHouse(params), // API เรียกข้อมูลของบ้านนั้นๆ
  });

  // คำนวณจำนวนหน้าทั้งหมด (จำนวนตัวละครทั้งหมด หารด้วย จำนวนต่อหน้า)
  totalPages = computed(() => {
    const total = this.charactersData.value()?.length ?? 0;
    return Math.ceil(total / this.pageSize);
  });

  // หั่นข้อมูลตัวละครเฉพาะส่วนที่จะนำมาแสดงในหน้าปัจจุบัน
  paginatedCharacters = computed(() => {
    const chars = this.charactersData.value() ?? []; // ข้อมูลทั้งหมด
    const start = (this.currentPage() - 1) * this.pageSize; // จุดเริ่มตัด
    return chars.slice(start, start + this.pageSize); // ตัดและคืนค่าส่วนที่ต้องการ
  });

  // ฟังก์ชันสลับหน้าเพจ
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) { // กันไม่ให้หน้าติดลบหรือเกินกว่าจำนวนจริง
      this.currentPage.set(page); // เซ็ตเลขหน้าใหม่
    }
  }
}

