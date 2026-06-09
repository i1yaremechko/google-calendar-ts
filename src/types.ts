export type EventColor = 'red' | 'blue' | 'green' | 'purple' | string;

export interface CalendarEvent {
  readonly id: string;
  title: string;
  description?: string;
  start: string;
  end: string;
  color: EventColor;
}