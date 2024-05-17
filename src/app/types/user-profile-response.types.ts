export enum UserGender {
  MALE = 'male',
  FEMALE = 'female',
}

export enum UserFitnessLevel {
  ROOKIE = 'rookie',
  INTERMEDIARY = 'intermediary',
  ADVANCED = 'advanced',
}

export type UserProfileResponse = {
  id: string;
  name: string;
  email: string;
  password_hash: undefined;
  gender: UserGender;
  birth_date: Date;
  diseases: string;
  weight: number;
  height: number;
  fitness_level: UserFitnessLevel;
  isOnBalancedDiet: boolean;
}
