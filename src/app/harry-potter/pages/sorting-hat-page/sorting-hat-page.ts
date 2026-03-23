import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sorting-hat-page',
  imports: [FormsModule],
  templateUrl: './sorting-hat-page.html',
  styleUrl: './sorting-hat-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortingHatPage {
  // ✨ สร้าง Writable Signals สำหรับเก็บค่าจากแบบฟอร์ม
  userName = signal<string>('');
  trait = signal<string>('');
  animal = signal<string>('');

  // ✨ Signal สำหรับเก็บผลลัพธ์บ้านที่สุ่มได้
  sortedHouse = signal<string>('');

  // ฟังก์ชันคำนวณบ้านเมื่อกด Submit ฟอร์ม
  sortHouse() {
    // เช็คว่ากรอกข้อมูลครบไหม
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

  // ฟังก์ชันล้างค่าฟอร์มเพื่อเล่นใหม่
  resetForm() {
    this.userName.set('');
    this.trait.set('');
    this.animal.set('');
    this.sortedHouse.set('');
  }
}
