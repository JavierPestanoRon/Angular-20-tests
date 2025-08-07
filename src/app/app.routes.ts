import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'pets', loadComponent: () => import('./pages/pets/pets') },
    { path: 'pet-details', loadComponent: () => import('./pages/pet-details/pet-details') },
    { path: '', redirectTo: 'pets', pathMatch: 'full' }
];
