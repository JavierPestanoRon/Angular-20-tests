import { calculatePetHealth } from './calculate-pet-health';
import { Cat, Dog, Pet } from '../../core/models/pets.interface';

describe('calculatePetHealth', () => {

  it('should return unhealthy for a cat with 1 life regardless of health calculation', () => {
    const cat: Cat = {
      id: 1,
      kind: 'cat',
      name: 'Whiskers',
      weight: 4,
      height: 1,
      length: 1,
      photo_url: '',
      description: '',
      number_of_lives: 1
    };

    expect(calculatePetHealth(cat)).toBe('Unhealthy');
  });

  it('should return very healthy for a cat with baseHealth between 2 and 3', () => {
    const cat: Cat = {
      id: 2,
      kind: 'cat',
      name: 'HealthyCat',
      weight: 6,
      height: 1,
      length: 2.5,
      photo_url: '',
      description: '',
      number_of_lives: 9
    };

    expect(calculatePetHealth(cat)).toBe('Very healthy');
  });

  it('should return healthy for a dog with baseHealth between 3 and 5', () => {
    const dog: Dog = {
      id: 3,
      kind: 'dog',
      name: 'HealthyDog',
      weight: 12,
      height: 1,
      length: 3.5,
      photo_url: '',
      description: ''
    };

    expect(calculatePetHealth(dog)).toBe('Healthy');
  });

  it('should return unhealthy for a pet with baseHealth below 2', () => {
    const dog: Dog = {
      id: 4,
      kind: 'dog',
      name: 'ThinDog',
      weight: 2,
      height: 1,
      length: 1.5,
      photo_url: '',
      description: ''
    };

    expect(calculatePetHealth(dog)).toBe('Unhealthy');
  });

  it('should return unhealthy for a pet with baseHealth over 5', () => {
    const dog: Dog = {
      id: 5,
      kind: 'dog',
      name: 'FatDog',
      weight: 30,
      height: 1,
      length: 1,
      photo_url: '',
      description: ''
    };

    expect(calculatePetHealth(dog)).toBe('Unhealthy');
  });

  it('should handle unknown pet kind using default logic', () => {
    type FuturePet = Pet & { kind: string };

    const unknownPet: FuturePet = {
    id: 6,
    kind: 'hamster',
    name: 'MysteryPet',
    weight: 4,
    height: 1,
    length: 1,
    photo_url: '',
    description: ''
    } as unknown as Pet;

    expect(calculatePetHealth(unknownPet)).toBe('Healthy');
  });

});
