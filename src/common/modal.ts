const modalElem = document.querySelector('.modal') as HTMLElement | null;
const closeBtnElem = document.querySelector('.create-event__close-btn') as HTMLElement | null;

export const openModal = (): void => {
  modalElem?.classList.remove('hidden');
};

export const closeModal = (): void => {
  modalElem?.classList.add('hidden');
};

closeBtnElem?.addEventListener('click', closeModal);