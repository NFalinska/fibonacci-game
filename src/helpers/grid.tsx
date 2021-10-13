export function getColumnOfGrid(i: number, size: number): number {
  return i % size;
}

export function getRowOfGrid(i: number, size: number): number {
  return Math.floor(i / size);
}
