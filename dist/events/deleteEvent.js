var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { closePopup } from '../common/popup.js';
import { getItem, STORAGE_KEY_SELECTED_EVENT_ID } from '../common/storage.js';
import { deleteEvent } from '../server/eventGateway.js';
import { fetchAndRenderEvents } from './eventRenderer.js';
export const onDeleteEvent = () => __awaiter(void 0, void 0, void 0, function* () {
    const eventId = getItem(STORAGE_KEY_SELECTED_EVENT_ID);
    if (!eventId)
        return;
    try {
        yield deleteEvent(eventId);
        closePopup();
        yield fetchAndRenderEvents();
    }
    catch (err) {
        alert('Internal Server Error');
    }
});
