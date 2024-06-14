export type CreateWorkoutResponse = {
  start_date: Date
  end_date: Date
  weekly_volume: number
  strengthening_workouts: number
  stress_level: number
  sleep_hours: number
  didMyofascialRelease: boolean,
  pain_discomfort: string,
  user_id: string,
  id: string,
  deletedDate: Date | null
}
