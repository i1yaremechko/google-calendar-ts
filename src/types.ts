export type EventColor = 'red' | 'blue' | 'green' | 'purple';

export interface CalendarEvent {
  readonly id: string;
  title: string;
  date: string;
  time?: string;
  description?: string;
  color: EventColor;
}