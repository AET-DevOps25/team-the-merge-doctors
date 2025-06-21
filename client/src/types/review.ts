export interface Review {
  name: string;
  rating: number;
  date: string;
  text: string;
  avatar: string;
  mentorId?: string;
  menteeId?: string;
}
