import { createNumbersArray } from '../common/createNumbersArray.js';

export const renderTimescale = (): void => {
  const timeScaleContainer = document.querySelector('.calendar__time-scale') as HTMLElement | null;
  if (!timeScaleContainer) return;
  
  const hours = createNumbersArray(0, 23);

  const timeScaleHTML = hours.map(hour => {
    const formattedHour = hour < 10 ? `0${hour}` : hour;

    return `
      <div class="time-slot"
        <span class="time-slot__time">${formattedHour}:00</span>
      </div>
    `;
  }).join('');

  timeScaleContainer.innerHTML = timeScaleHTML;
};
