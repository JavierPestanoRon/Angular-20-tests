import { Component, inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { PetStateService } from '../../../../shared/service/pet-state.service';
import { PetWithHealth } from '../../../../core/models/pets.interface';
import { CommonModule } from '@angular/common';
import { FallBackImage } from '../../../../shared/directives/fall-back-image';

@Component({
  selector: 'app-pet-of-the-day',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, FallBackImage],
  templateUrl: './pet-of-the-day.html',
  styleUrl: './pet-of-the-day.scss'
})
export class PetOfTheDay implements OnInit {
  @Input() pet: PetWithHealth | null = null;

  private router = inject(Router);
  private petStateSvc = inject(PetStateService);

  isPetOfTheDayVisible = false;

  ngOnInit() {
    this.isPetOfTheDayVisible = this.petStateSvc.getIsPetOfTheDayVisible();
  }

  goToDetails() {
    this.petStateSvc.setPet(this.pet);
    this.router.navigate(['/pet-details']);
  }

  showPetOfTheDay() {
    this.isPetOfTheDayVisible = true;
    this.petStateSvc.setIsPetOfTheDayVisible(true);
  }
}
