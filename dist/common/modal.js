const modalElem = document.querySelector('.modal');
const closeBtnElem = document.querySelector('.create-event__close-btn');
export const openModal = () => {
    modalElem === null || modalElem === void 0 ? void 0 : modalElem.classList.remove('hidden');
};
export const closeModal = () => {
    modalElem === null || modalElem === void 0 ? void 0 : modalElem.classList.add('hidden');
};
closeBtnElem === null || closeBtnElem === void 0 ? void 0 : closeBtnElem.addEventListener('click', closeModal);
