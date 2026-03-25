import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Character } from '../../types/api';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-character-list',
  imports: [RouterLink],
  templateUrl: './character-list.html',
  styleUrl: './character-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterList {
  // รับข้อมูลตัวละคร (characters) จาก Component แม่ เพื่อนำมาแสดงผลด้วย input.required()
  readonly characters = input.required<Character[]>();
}
