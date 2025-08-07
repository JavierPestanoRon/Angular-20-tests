import { HealthTier, Pet } from "../../core/models/pets.interface";


export function calculatePetHealth(pet: Pet): HealthTier {
  switch (pet.kind) {
    case 'cat':
      return calculateCatHealth(pet);
    case 'dog':
      return calculateDogHealth(pet);
    default:
      return calculateDefaultHealth(pet);
  }
}

function calculateCatHealth(pet: Extract<Pet, { kind: 'cat' }>): HealthTier {
  if (pet.number_of_lives === 1) {
    return 'Unhealthy';
  }
  return evaluateBasicHealth(pet);
}

function calculateDogHealth(pet: Extract<Pet, { kind: 'dog' }>): HealthTier {
  return evaluateBasicHealth(pet);
}

function calculateDefaultHealth(pet: Pet): HealthTier {
  return evaluateBasicHealth(pet);
}

function evaluateBasicHealth(pet: Pet): HealthTier {
  const baseHealth = pet.weight / (pet.height * pet.length);

  if (baseHealth < 2 || baseHealth > 5) return 'Unhealthy';
  if (baseHealth >= 3 && baseHealth <= 5) return 'Healthy';
  if (baseHealth >= 2 && baseHealth < 3) return 'Very healthy';

  return 'Unhealthy';
}
