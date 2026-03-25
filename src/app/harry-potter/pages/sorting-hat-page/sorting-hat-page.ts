import { ChangeDetectionStrategy, Component, signal, resource } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { fetchCharactersByHouse } from '../../helpers/resources';
import { HousesView } from '../../components/houses-view/houses-view';

@Component({
  selector: 'app-sorting-hat-page',
  imports: [FormsModule, HousesView],
  templateUrl: './sorting-hat-page.html',
  styleUrl: './sorting-hat-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortingHatPage {
  // ✨ สร้างสัญญาณ (Signals) ที่แก้ไขค่าได้ สำหรับเก็บค่าที่ผู้ใช้พิมพ์หรือเลือกในแบบฟอร์ม
  userName = signal<string>('');
  trait = signal<string>('');
  animal = signal<string>('');

  // ✨ Signal สำหรับเก็บผลลัพธ์การคัดสรรบ้านที่ได้
  sortedHouse = signal<string>('');

  // 🎯 ดึงข้อมูลเพื่อนร่วมบ้านจาก API อัตโนมัติ ทันทีที่รู้ว่าตัวเองอยู่บ้านไหน (ใช้ resource())
  houseMembersData = resource({
    params: () => this.sortedHouse(), // ส่งชื่อบ้านที่ได้จากการคัดสรร
    loader: async ({ params }) => {
      if (!params) return []; // ถ้ายังไม่เริ่ม จะไม่ดึงข้อมูล
      return await fetchCharactersByHouse(params.toLowerCase()); // เรียก API แยกตามบ้าน
    }
  });

  // ฟังก์ชันคำนวณและประมวลผลบ้านเมื่อกดส่งแบบฟอร์ม
  sortHouse() {
    // เช็คว่ากรอกข้อมูลครบทุกช่องหรือไม่
    if (!this.userName() || !this.trait() || !this.animal()) {
      alert('กรุณาตอบคำถามให้ครบก่อนสวมหมวกคัดสรร!');
      return;
    }

    const selectedTrait = this.trait();
    const selectedAnimal = this.animal();

    // ลอจิกการคัดสรรบ้านแบบง่ายๆ
    if (selectedTrait === 'brave' || selectedAnimal === 'lion') {
      this.sortedHouse.set('Gryffindor');
    } else if (selectedTrait === 'smart' || selectedAnimal === 'eagle') {
      this.sortedHouse.set('Ravenclaw');
    } else if (selectedTrait === 'loyal' || selectedAnimal === 'badger') {
      this.sortedHouse.set('Hufflepuff');
    } else {
      this.sortedHouse.set('Slytherin');
    }
  }

  // ฟังก์ชันกดย้อนกลับเพื่อรีเซ็ตค่าฟอร์ม และเล่นใหม่ตั้งแต่แรก
  resetForm() {
    this.userName.set(''); // ล้างชื่อ
    this.trait.set(''); // ล้างจุดเด่น
    this.animal.set(''); // ล้างสัตว์
    this.sortedHouse.set(''); // ล้างผลลัพธ์บ้าน
  }
}
