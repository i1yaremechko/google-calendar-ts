const popupElem = document.querySelector('.popup');
const popupContentElem = document.querySelector('.popup__content');
export const openPopup = (x, y) => {
    popupElem === null || popupElem === void 0 ? void 0 : popupElem.classList.remove('hidden');
    if (popupContentElem) {
        popupContentElem.style.top = `${y}px`;
        popupContentElem.style.left = `${x}px`;
    }
};
export const closePopup = () => {
    popupElem === null || popupElem === void 0 ? void 0 : popupElem.classList.add('hidden');
};
const onClickInsidePopup = (event) => {
    event.stopPropagation();
};
popupContentElem === null || popupContentElem === void 0 ? void 0 : popupContentElem.addEventListener('click', onClickInsidePopup);
popupElem === null || popupElem === void 0 ? void 0 : popupElem.addEventListener('click', closePopup);
