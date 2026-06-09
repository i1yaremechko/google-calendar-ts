var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getItem, setItem, STORAGE_KEY_DISPLAYED_WEEK_START, STORAGE_KEY_EVENTS } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
import { getEventsList } from '../server/eventGateway.js';
import { createEventElement } from './eventElement.js';
export const renderEvents = () => {
    document.querySelectorAll('.event').forEach(elem => elem.remove());
    const events = getItem(STORAGE_KEY_EVENTS) || [];
    const displayedWeekStart = getItem(STORAGE_KEY_DISPLAYED_WEEK_START);
    if (!displayedWeekStart)
        return;
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
export const fetchAndRenderEvents = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield getEventsList();
        setItem(STORAGE_KEY_EVENTS, events);
        renderEvents();
    }
    catch (error) {
        alert('Internal Server Error');
    }
});
