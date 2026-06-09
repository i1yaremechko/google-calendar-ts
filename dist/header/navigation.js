import { renderCalendar } from '../calendar/calendar.js';
import { openModal } from '../common/modal.js';
import shmoment from '../common/shmoment.js';
import { getItem, setItem, STORAGE_KEY_DISPLAYED_WEEK_START } from '../common/storage.js';
import { getDisplayedMonth, getStartOfWeek } from '../common/time.utils.js';
const navElem = document.querySelector('.navigation');
const displayedMonthElem = document.querySelector('.navigation__displayed-month');
const createBtn = document.querySelector('.create-event-btn');
export const renderCurrentMonth = () => {
    const displayedWeekStart = getItem(STORAGE_KEY_DISPLAYED_WEEK_START);
    if (!displayedWeekStart || !displayedMonthElem)
        return;
    const currentMonthText = getDisplayedMonth(displayedWeekStart);
    displayedMonthElem.textContent = currentMonthText;
};
const onChangeWeek = (event) => {
    const target = event.target;
    const button = target.closest('button');
    if (!button)
        return;
    const direction = button.dataset.direction;
    const displayedWeekStart = getItem(STORAGE_KEY_DISPLAYED_WEEK_START);
    if (!displayedWeekStart || !direction)
        return;
    setItem(STORAGE_KEY_DISPLAYED_WEEK_START, direction === 'today'
        ? getStartOfWeek(new Date())
        : shmoment(displayedWeekStart)[direction === 'next' ? 'add' : 'subtract']('days', 7).result());
    renderCalendar();
};
export const initNavigation = () => {
    renderCurrentMonth();
    navElem === null || navElem === void 0 ? void 0 : navElem.addEventListener('click', onChangeWeek);
    createBtn === null || createBtn === void 0 ? void 0 : createBtn.addEventListener('click', openModal);
};
