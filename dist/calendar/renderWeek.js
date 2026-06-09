var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getItem, STORAGE_KEY_DISPLAYED_WEEK_START } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
import { renderEvents } from '../events/eventRenderer.js';
import { renderCurrentTimeLine } from './currentTimeLine.js';
import { generateDayMarkup } from './day.js';
export const renderWeek = () => __awaiter(void 0, void 0, void 0, function* () {
    const weekContainer = document.querySelector('.calendar__week');
    if (!weekContainer)
        return;
    const displayedWeekStart = getItem(STORAGE_KEY_DISPLAYED_WEEK_START);
    if (!displayedWeekStart)
        return;
    const weekDates = generateWeekRange(displayedWeekStart);
    weekContainer.innerHTML = weekDates
        .map(date => generateDayMarkup(date))
        .join('');
    renderEvents();
    renderCurrentTimeLine();
});
