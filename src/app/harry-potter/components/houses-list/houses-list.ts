import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-houses-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './houses-list.html',
  styleUrl: './houses-list.scss',
})
export class HousesList {}
