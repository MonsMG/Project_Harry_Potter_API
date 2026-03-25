import { Component, resource, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CharacterList } from '../../components/character-list/character-list';
import { fetchAllCharacters } from '../../helpers/resources';

@Component({
  selector: 'app-characters-list-page',
  standalone: true,
  imports: [CharacterList, FormsModule], // 🎯 อย่าลืม import Component เข้ามาใช้
  templateUrl: './characters-list-page.html',
  styleUrl: './characters-list-page.scss',
})
export class CharactersListPage {
  searchQuery = signal<string>(''); // ตัวแปรเก็บข้อความคำค้นหา
  currentPage = signal(1); // ตัวแปรเก็บตำแหน่งหน้าปัจจุบันสำหรับการเปิดดูทีละหน้า
  readonly pageSize = 20; // จำนวนข้อมูลตัวละครที่จะแสดงในแต่ละหน้า (20 รายการ)

  // 🎯 ดึงข้อมูลตัวละครทั้งหมดจาก API อัตโนมัติเมื่อเริ่มโหลด Component 
  charactersData = resource({
    loader: async () => await fetchAllCharacters(),
  });

  // กรองข้อมูลตามคำค้นหา
  // กรองข้อมูลตัวละครตามคำค้นหา
  filteredCharacters = computed(() => {
    const chars = this.charactersData.value() ?? []; // ข้อมูลตัวละครทั้งหมดจาก API
    const query = this.searchQuery().toLowerCase().trim(); // ข้อความที่ผู้ใช้พิมพ์ค้นหา (ปรับตัวเล็ก)
    if (!query) return chars; // ถ้าไม่ได้พิมพ์อะไร ก็คืนค่าทั้งหมดไปเลย
    return chars.filter(c => c.name.toLowerCase().includes(query)); // กรองเฉพาะตัวที่มีชื่อตรงกับข้อความ
  });

  // คำนวณจำนวนหน้าทั้งหมด โดยเอาตัวละครที่กรองแล้วมาหารด้วยจำนวนตัวต่อหน้า
  totalPages = computed(() => Math.ceil(this.filteredCharacters().length / this.pageSize));

  // หั่นข้อมูลตัวละครทีละส่วนตามหน้าปัจจุบัน สำหรับเอาไปแสดงผล (Pagination)
  paginatedCharacters = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize; // จุดเริ่มต้น (เช่น หน้า 1 ตำแหน่งที่ 0)
    return this.filteredCharacters().slice(start, start + this.pageSize); // ตัด Array เอาเฉพาะช่วงที่จะแสดง
  });

  // ฟังก์ชันสำหรับเปลี่ยนหน้า
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) { // เช็คไม่ให้เลยขอบเขตจำนวนหน้าจริง
      this.currentPage.set(page); // เซ็ตการเปลี่ยนหน้า
    }
  }

  // ทำงานเมื่อมีการพิมพ์ค้นหาใหม่ (รีเซ็ตให้กลับมาหน้าแรกทุกครั้งที่ค้นหา)
  onSearch(query: string) {
    this.searchQuery.set(query); // อัปเดตคำค้นหาใหม่
    this.currentPage.set(1); // สั่งให้กลับไปอยู่หน้าหนึ่งเสมอ
  }
}
