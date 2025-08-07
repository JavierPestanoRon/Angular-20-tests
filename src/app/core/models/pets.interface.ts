export interface BasePet {
  id: number;
  name: string;
  kind: 'dog' | 'cat';
  weight: number; 
  height: number;
  length: number;
  photo_url: string;
  description: string;
  [key: string]: unknown;
}

export interface Dog extends BasePet {
  kind: 'dog';
}

export interface Cat extends BasePet {
  kind: 'cat';
  number_of_lives: number;
}

export type Pet = Dog | Cat;

export type PetListResponse = Pet[];

export type HealthTier = 'Unhealthy' | 'Very healthy' | 'Healthy';

export type PetWithHealth = Pet & {
  health: HealthTier;
};
