import { openPopup } from '../common/popup.js';
import { getItem, setItem, STORAGE_KEY_EVENTS, STORAGE_KEY_SELECTED_EVENT_ID } from '../common/storage.js';
import { CalendarEvent } from '../types.js';
import { onChangeEventColor } from './changeEventColor.js';
import { onDeleteEvent } from './deleteEvent.js';

const weekElem = document.querySelector('.calendar__week') as HTMLElement | null;
const deleteEventBtn = document.querySelector('.delete-event-btn') as HTMLElement | null;
const colorPickerInPopup = document.querySelector('.change-event-color-picker') as HTMLInputElement | null;

const handleEventClick = (event: MouseEvent): void => {
  const target = event.target as HTMLElement;
  const eventElem = target.closest('.event') as HTMLElement | null;
  
  if (!eventElem) return;
  
  event.stopPropagation();
  const eventId = eventElem.dataset.eventId;
  
  if (!eventId) return;
  setItem(STORAGE_KEY_SELECTED_EVENT_ID, eventId);

  const events: CalendarEvent[] = getItem(STORAGE_KEY_EVENTS) || [];
  const currentEvent = events.find(e => e.id === eventId);
  
  if (currentEvent && colorPickerInPopup) {
    colorPickerInPopup.value = currentEvent.color || '#1a73e8';
  }

  openPopup(event.clientX, event.clientY);
}

export const initEvents = (): void => {
  if (weekElem) {
    weekElem.addEventListener('click', handleEventClick as EventListener);
  }
  
  if (deleteEventBtn) {
    deleteEventBtn.addEventListener('click', onDeleteEvent as EventListener);
  }
  
  if (colorPickerInPopup) {
    colorPickerInPopup.addEventListener('change', onChangeEventColor as EventListener);
  }
};
