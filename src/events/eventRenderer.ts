import { getItem, setItem, STORAGE_KEY_DISPLAYED_WEEK_START, STORAGE_KEY_EVENTS } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
import { getEventsList } from '../server/eventGateway.js';
import { CalendarEvent } from '../types.js';
import { createEventElement } from './eventElement.js';

export const renderEvents = (): void => {  
  document.querySelectorAll('.event').forEach(elem => elem.remove());

  const events: CalendarEvent[] = getItem(STORAGE_KEY_EVENTS) || [];
  const displayedWeekStart = getItem(STORAGE_KEY_DISPLAYED_WEEK_START);

  if (!displayedWeekStart) return;

  const weekDates = generateWeekRange(displayedWeekStart);
  const weekDatesStrings = weekDates.map(date => date.toDateString());
  
  events.forEach(event => {
    const eventStart = new Date(event.start);
      
    if (weekDatesStrings.includes(eventStart.toDateString())) {
      const slotSelector = `.calendar__day[data-day="${eventStart.getDate()}"] .calendar__time-slot[data-time="${eventStart.getHours()}"]`;
      const timeSlotElem = document.querySelector(slotSelector);

      if (timeSlotElem) {
        timeSlotElem.append(createEventElement(event));
      }
    }
  });
};

export const fetchAndRenderEvents = async (): Promise<void> => {
  try {
    const events = await getEventsList();
    setItem(STORAGE_KEY_EVENTS, events);
    renderEvents();
  } catch (error) {
    alert('Internal Server Error');
  }
};