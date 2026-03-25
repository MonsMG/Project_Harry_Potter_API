import { ChangeDetectionStrategy, Component, resource, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { fetchAllSpells } from '../../helpers/resources';
import { Spell } from '../../types/api';
import { SpellsViewComponent } from '../../components/spells-view/spells-view';

@Component({
  selector: 'app-spells-list-page',
  standalone: true,
  imports: [FormsModule, SpellsViewComponent],
  templateUrl: './spells-list-page.html',
  styleUrl: './spells-list-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpellsListPage {
  searchQuery = signal<string>(''); // ตัวแปรเก็บข้อความสำหรับค้นหาคาถา
  currentPage = signal(1); // ตัวแปรเก็บตำแหน่งหน้าปัจจุบันสำหรับการเปิดดูทีละหน้า
  readonly pageSize = 20; // กำหนดจำนวนจำนวนข้อมูลคาถาที่จะแสดงในแต่ละหน้า (20 รายการ)

  // จัดการดึงข้อมูลคาถาทุกคาถาจาก API อัตโนมัติเมื่อ component โหลด
  spellsData = resource<Spell[], void>({
    loader: async () => await fetchAllSpells(), 
  });

  // กรองข้อมูลคาถาที่มีชื่อตรงกับคำที่ผู้ใช้ค้นหา
  filteredSpells = computed(() => {
    const spells = this.spellsData.value() ?? []; // ดึงข้อมูลคาขาทั้งหมด (ถ้ายังไม่มีให้เป็น Array ว่าง)
    const query = this.searchQuery().toLowerCase().trim(); // แปลงคำค้นหาเป็นตัวเล็กเพื่อตรวจสอบง่ายๆ
    return spells.filter(s => s.name.toLowerCase().includes(query)); // กรองเฉพาะคาถาที่มีคำค้นหานั้นๆ
  });

  // คำนวณจำนวนหน้าทั้งหมด โดยเอาคาขาที่กรองแล้วมาหารด้วยจำนวนต่อหน้า
  totalPages = computed(() => Math.ceil(this.filteredSpells().length / this.pageSize));

  // หั่นข้อมูลคาขาทีละส่วนตามหน้าปัจจุบัน (Pagination) สำหรับส่งไปแสดงผล
  paginatedSpells = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize; // คำนวณตำแหน่งเริ่มต้น (เช่น หน้า 1 ตำแหน่งที่ 0)
    return this.filteredSpells().slice(start, start + this.pageSize); // ตัด Array ข้อมูลเฉพาะส่วนที่จะแสดงในหน้านี้
  });

  // ฟังก์ชันสำหรับเปลี่ยนหน้า (จะเช็คไม่ให้เลยขอบเขตจำนวนหน้าที่มี)
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page); // เซ็ตค่าตัวแปรเพื่อบอกว่าเรากำลังดูหน้าไหนอยู่
    }
  }

  // ทำงานเมื่อมีการพิมพ์ค้นหาใหม่ (รีเซ็ตให้กลับมาหน้าแรกทุกครั้งที่ค้นหา)
  onSearch(query: string) {
    this.searchQuery.set(query); // อัปเดตคำค้นหา
    this.currentPage.set(1); // สั่งกลับมาหน้าแรก
  }
}