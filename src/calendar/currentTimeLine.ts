import { getItem, STORAGE_KEY_DISPLAYED_WEEK_START } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';

export const renderCurrentTimeLine = (): void => {
  const oldLine = document.querySelector('.current-time-line');
  if (oldLine) oldLine.remove();

  const currentDate = new Date();
  const displayedWeekStart = getItem(STORAGE_KEY_DISPLAYED_WEEK_START);
  if (!displayedWeekStart) return;
  
  const weekDates = generateWeekRange(displayedWeekStart);

  const isCurrentWeek = weekDates.some(
    date => date.toDateString() === currentDate.toDateString()
  );

  if (!isCurrentWeek) return;

  const currentDayElem = document.querySelector(
    `.calendar__day[data-day="${currentDate.getDate()}"]`
  ) as HTMLElement | null;

  if (!currentDayElem) return;

  const presentTime = document.createElement('div');
  presentTime.classList.add('current-time-line');
  
  const clockHeight = currentDate.getHours() * 60 + currentDate.getMinutes();
  presentTime.style.top = `${clockHeight}px`;

  currentDayElem.append(presentTime);
};

export const initCurrentTimeLine = (): void => {
  renderCurrentTimeLine();
  setInterval(renderCurrentTimeLine, 60000);
};