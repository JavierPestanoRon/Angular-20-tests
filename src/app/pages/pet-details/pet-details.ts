import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { PetStateService } from '../../shared/service/pet-state.service';
import { PetWithHealth } from '../../core/models/pets.interface';
import { MatCardModule } from '@angular/material/card';
import { FallBackImage } from '../../shared/directives/fall-back-image';
import { GramsToKgPipe } from '../../shared/pipes/grams-to-kg';

@Component({
  selector: 'app-pet-details',
  imports: [CommonModule, MatButtonModule, MatCardModule, FallBackImage, GramsToKgPipe],
  templateUrl: './pet-details.html',
  styleUrl: './pet-details.scss'
})
export default class PetDetails implements OnInit {
  private router = inject(Router);
  private petStateSvc = inject(PetStateService);
  pet: PetWithHealth | null = null;

  ngOnInit() {
    this.pet = this.petStateSvc.getPet();
  }

  goBack() {
    this.router.navigate(['/pets']);
  }
}