var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { renderEvents } from '../events/eventRenderer.js';
import { renderCurrentMonth } from '../header/navigation.js';
import { renderHeader } from './header.js';
import { renderWeek } from './renderWeek.js';
export const renderCalendar = () => __awaiter(void 0, void 0, void 0, function* () {
    renderHeader();
    yield renderWeek();
    renderCurrentMonth();
});
export const initCalendarSync = () => {
    setInterval(renderEvents, 10000);
};
