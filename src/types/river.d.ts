export interface River {
  id: string;
  name: string;
  width: number;
  points: Point[];
}

export interface Point {
  x: number;
  y: number;
}
