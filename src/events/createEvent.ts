import { closeModal } from '../common/modal.js';
import { getItem, STORAGE_KEY_EVENTS } from '../common/storage.js';
import { getDateTime } from '../common/time.utils.js';
import { createEvent } from '../server/eventGateway.js';
import { CalendarEvent } from '../types.js';
import { fetchAndRenderEvents } from './eventRenderer.js';

const eventFormElem = document.querySelector('.event-form') as HTMLFormElement | null;

const onCreateEvent = async (event: Event): Promise<void> => {
  event.preventDefault();
  if (!eventFormElem) return;

  const formData = new FormData(eventFormElem);

  const dateValue = formData.get('date');
  const startTimeValue = formData.get('startTime');
  const endTimeValue = formData.get('endTime');

  if (!dateValue || !startTimeValue || !endTimeValue) {
    alert('Please fill in all required date and time field.');
    return;
  }

  const startDateTime = getDateTime(dateValue, startTimeValue);
  const endDateTime = getDateTime(dateValue, endTimeValue);

  const durationInMinutes = (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60);
  if (durationInMinutes % 15 !== 0) {
    alert('Event duration and start/end time must be a multiple of 15 minutes!');
    return;
  }

  if (durationInMinutes > 360) {
    alert('The event cannot last longer than 6 hours!');
    return;
  }

  if (startDateTime.toDateString() !== endDateTime.toDateString()) {
    alert('The event must start and end within the same day!');
    return;
  }

  const currentEvents: CalendarEvent[] = getItem(STORAGE_KEY_EVENTS) || []; 
  const isOverlapping = currentEvents.some(e => {
    const eStart = new Date(e.start);
    const eEnd = new Date(e.end);
    return startDateTime < eEnd && endDateTime > eStart;
  });

  if (isOverlapping) {
    alert('Another event is already planned for this time!');
    return;
  }

  const newEvent: Omit<CalendarEvent, 'id'> = {
    title: (formData.get('title') as string) || 'No Title',
    description: (formData.get('description') as string) || '',
    start: startDateTime.toISOString(),
    end: endDateTime.toISOString(),
    color: (formData.get('color') as string) || 'blue',
  };

  try {
    await createEvent(newEvent);
    closeModal();
    eventFormElem.reset();
    await fetchAndRenderEvents();
  } catch (err) {
    alert('Internal Server Error');
  }
};

export const initEventForm = (): void => {
  eventFormElem?.addEventListener('submit', onCreateEvent);
};
