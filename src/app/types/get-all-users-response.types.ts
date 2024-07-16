export type GetAllUsersResponse = {
  data: User[],
  count: number
}

export type User = {
  id: string,
  name: string,
  email: string,
  password_hash: string,
  gender: string,
  birth_date: string,
  diseases: string,
  weight: number,
  height: number,
  fitness_level: string,
  past_injuries: string,
  isOnBalancedDiet: boolean,
  isAdmin: boolean,
  deletedDate?: Date,
}