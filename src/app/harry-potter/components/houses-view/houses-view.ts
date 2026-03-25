import { Component, input } from '@angular/core';
import { Character } from '../../types/api';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-houses-view',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './houses-view.html',
  styleUrl: './houses-view.scss',
})
export class HousesView {
  // 🎯 รับข้อมูลตัวละคร (Array) จาก Page ด้วย Signal Input
  readonly characters = input.required<Character[]>();
}
