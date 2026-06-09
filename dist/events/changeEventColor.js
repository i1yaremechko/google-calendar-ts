var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getItem, setItem, STORAGE_KEY_EVENTS, STORAGE_KEY_SELECTED_EVENT_ID } from '../common/storage.js';
import { updateEvent } from '../server/eventGateway.js';
import { fetchAndRenderEvents, renderEvents } from './eventRenderer.js';
export const onChangeEventColor = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const eventId = getItem(STORAGE_KEY_SELECTED_EVENT_ID);
    const target = event.target;
    const newColor = target.value;
    let events = getItem(STORAGE_KEY_EVENTS) || [];
    events = events.map(e => e.id === eventId ? Object.assign(Object.assign({}, e), { color: newColor }) : e);
    setItem(STORAGE_KEY_EVENTS, events);
    const eventElem = document.querySelector(`.event[data-event-id="${eventId}"]`);
    if (eventElem) {
        eventElem.style.backgroundColor = newColor;
    }
    try {
        const eventToUpdate = events.find(e => e.id === eventId);
        if (eventToUpdate && eventId) {
            yield updateEvent(eventId, eventToUpdate);
        }
        renderEvents();
    }
    catch (error) {
        alert('error updating color on server');
        yield fetchAndRenderEvents();
    }
});
