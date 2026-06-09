import { renderCalendar } from '../calendar/calendar.js';
import { openModal } from '../common/modal.js';
import shmoment from '../common/shmoment.js';
import { getItem, setItem, STORAGE_KEY_DISPLAYED_WEEK_START } from '../common/storage.js';
import { getDisplayedMonth, getStartOfWeek } from '../common/time.utils.js';

const navElem = document.querySelector('.navigation') as HTMLElement | null;
const displayedMonthElem = document.querySelector('.navigation__displayed-month') as HTMLElement | null;
const createBtn = document.querySelector('.create-event-btn') as HTMLElement | null;

export const renderCurrentMonth = (): void => {
  const displayedWeekStart = getItem(STORAGE_KEY_DISPLAYED_WEEK_START);
  if (!displayedWeekStart || !displayedMonthElem) return;

  const currentMonthText = getDisplayedMonth(displayedWeekStart);
  displayedMonthElem.textContent = currentMonthText;
}

const onChangeWeek = (event: Event): void => {
  const target = event.target as HTMLElement;
  const button = target.closest('button') as HTMLElement | null;
  if (!button) return;

  const direction = button.dataset.direction;
  const displayedWeekStart = getItem(STORAGE_KEY_DISPLAYED_WEEK_START);
  if (!displayedWeekStart || !direction) return;
  
  setItem(STORAGE_KEY_DISPLAYED_WEEK_START,
    direction === 'today'
      ? getStartOfWeek(new Date())
      : shmoment(displayedWeekStart) [direction === 'next' ? 'add' : 'subtract']
      ('days', 7).result()
  );
  renderCalendar();
};

export const initNavigation = (): void => {
  renderCurrentMonth();
  
  navElem?.addEventListener('click', onChangeWeek);
  createBtn?.addEventListener('click', openModal);
};
