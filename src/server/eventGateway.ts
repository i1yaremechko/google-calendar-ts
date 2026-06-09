import { CalendarEvent } from "../types.js";

const baseUrl = 'https://69d36635336103955f8eed65.mockapi.io/api/v1/events';

const handleResponse = (res: Response): Promise<any> => {
  if (res.ok) {
    return res.json();
  }
  throw new Error('Internal Server Error');
};

export const getEventsList = (): Promise<CalendarEvent[]> => 
  fetch(baseUrl).then(handleResponse);

export const createEvent = (eventData: Omit<CalendarEvent, 'id'>): Promise<CalendarEvent> => 
  fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventData),
  }).then(handleResponse);

export const updateEvent = (id: string, eventData: CalendarEvent): Promise<CalendarEvent> => 
  fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventData),
  }).then(handleResponse);

export const deleteEvent = (id: string): Promise<any> => 
  fetch(`${baseUrl}/${id}`, { method: 'DELETE' }).then(handleResponse);