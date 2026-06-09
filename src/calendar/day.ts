import { createNumbersArray } from '../common/createNumbersArray.js';

const generateDaySlots = (): string => {
  const hours = createNumbersArray(0, 23);
  return hours
    .map(hour => `<div class="calendar__time-slot" data-time="${hour}"></div>`)
    .join('');
};

export const generateDayMarkup = (date: Date): string => {
  return `
    <div class="calendar__day" data-day="${date.getDate()}">
      ${generateDaySlots()} 
    </div>
  `;
};
