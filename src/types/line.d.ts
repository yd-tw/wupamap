export interface Line {
  id: string;
  name: string;
  color: string;
  width: number;
  points: Point[];
}

interface Point {
  x: number;
  y: number;
}
