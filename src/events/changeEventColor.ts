import { getItem, setItem, STORAGE_KEY_EVENTS, STORAGE_KEY_SELECTED_EVENT_ID } from '../common/storage.js';
import { updateEvent } from '../server/eventGateway.js';
import { CalendarEvent } from '../types.js';
import { fetchAndRenderEvents, renderEvents } from './eventRenderer.js';

export const onChangeEventColor = async (event: Event): Promise<void> => {
  const eventId = getItem(STORAGE_KEY_SELECTED_EVENT_ID);
  
  const target = event.target as HTMLInputElement | HTMLSelectElement;
  const newColor = target.value;

  let events: CalendarEvent[] = getItem(STORAGE_KEY_EVENTS) || [];

  events = events.map(e => 
    e.id === eventId ? { ...e, color: newColor } : e
  );
  setItem(STORAGE_KEY_EVENTS, events);

  const eventElem = document.querySelector(`.event[data-event-id="${eventId}"]`) as HTMLElement | null;
  if (eventElem) {
    eventElem.style.backgroundColor = newColor;
  }

  try {
    const eventToUpdate = events.find(e => e.id === eventId);
    if (eventToUpdate && eventId) {
      await updateEvent(eventId, eventToUpdate);
    }
    renderEvents();
  } catch (error) {
    alert('error updating color on server')
    await fetchAndRenderEvents();
  }
};
