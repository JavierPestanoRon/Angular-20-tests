import { TestBed } from '@angular/core/testing';
import { PetStateService } from './pet-state.service';
import { PetWithHealth } from '../../core/models/pets.interface';

describe('PetStateService', () => {
  let service: PetStateService;

  const mockPet: PetWithHealth = {
    id: 1,
    name: 'Milo',
    kind: 'cat',
    weight: 3500,
    height: 25,
    length: 40,
    photo_url: '/assets/milo.png',
    description: 'Playful kitten',
    number_of_lives: 9,
    health: 'Healthy'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return null by default', () => {
    expect(service.getPet()).toBeNull();
  });

  it('should store and return a pet', () => {
    service.setPet(mockPet);
    expect(service.getPet()).toEqual(mockPet);
  });

  it('should clear the pet when null is set', () => {
    service.setPet(mockPet);
    service.setPet(null);
    expect(service.getPet()).toBeNull();
  });
});
