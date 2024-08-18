export type Workout = {
  id: string;
  start_date: Date;
  end_date: Date;
  weekly_volume: number;
  strengthening_workouts: number;
  diet_level: number;
  stress_level: number;
  sleep_hours: number;
  didMyofascialRelease: boolean;
  pain_discomfort: string;
  deletedDate?: Date;
  user_id: string;
}

export type WorkoutFeedback = Omit<
  Workout,
  | 'id'
  | 'start_date'
  | 'end_date'
  | 'pain_discomfort'
  | 'deletedDate'
  | 'user_id'
  | 'didMyofascialRelease'
>;
