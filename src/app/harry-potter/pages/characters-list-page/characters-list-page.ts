import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HarryPotterService, Character } from '../../services/harry-potter.service';

@Component({
  selector: 'app-characters-list-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './characters-list-page.html',
  styleUrls: ['./characters-list-page.scss']
})
export class CharactersListPage implements OnInit {
  private hpService = inject(HarryPotterService);
  
  characters: Character[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.hpService.getAllCharacters().subscribe({
      next: (data) => {
        // บางตัวละครไม่มีรูปภาพ อาจจะกรองเฉพาะคนที่มีรูปก็ได้
        this.characters = data; 
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching characters', err);
        this.isLoading = false;
      }
    });
  }
}
