export interface Country {
  id: string;
  name: string;
  members: number;
  problemsSolved: number;
  totalTimeSpent: number;
  averageRating: number;
  flagImage: string;
  students: Student[];
}

export interface Student {
  id: string;
  name: string;
  avatar: string;
  solved: number;
  timeSpent: number;
  rating: number;
}