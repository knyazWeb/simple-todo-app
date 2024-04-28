import { dateItemType } from "./items.types";

export function isValidDate(year: number, month: number, day: number): boolean {
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

export function createDayItems(year: number, month: number): dateItemType[] {
  const daysInMonth = new Date(year, month, 0).getDate();
  const dayItems = [];
  for (let i = 1; i <= daysInMonth; i++) {
    dayItems.push({ id: i, name: i.toString(), unavailable: false });
  }
  return dayItems;
}


export const monthItems = [
  { id: 1, name: "January", unavailable: false },
  { id: 2, name: "February", unavailable: false },
  { id: 3, name: "March", unavailable: false },
  { id: 4, name: "April", unavailable: false },
  { id: 5, name: "May", unavailable: false },
  { id: 6, name: "June", unavailable: false },
  { id: 7, name: "July", unavailable: false },
  { id: 8, name: "August", unavailable: false },
  { id: 9, name: "September", unavailable: false },
  { id: 10, name: "October", unavailable: false },
  { id: 11, name: "November", unavailable: false },
  { id: 12, name: "December", unavailable: false },
];

export const yearItems = [
  { id: 1, name: "2021", unavailable: false },
  { id: 2, name: "2022", unavailable: false },
  { id: 3, name: "2023", unavailable: false },
  { id: 4, name: "2024", unavailable: false },
  { id: 5, name: "2025", unavailable: false },
  { id: 6, name: "2026", unavailable: false },
  { id: 7, name: "2027", unavailable: false },
  { id: 8, name: "2028", unavailable: false },
  { id: 9, name: "2029", unavailable: false },
  { id: 10, name: "2030", unavailable: false },
];
