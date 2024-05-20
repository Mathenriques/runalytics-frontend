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
  birth_date: string;
  diseases: string | null;
  weight: number | null;
  height: number | null;
  fitness_level: UserFitnessLevel | null;
  isOnBalancedDiet: boolean | null;
}
