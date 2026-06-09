const popupElem = document.querySelector('.popup') as HTMLElement | null;
const popupContentElem = document.querySelector('.popup__content') as HTMLElement | null;

export const openPopup = (x: number, y: number): void => {
  popupElem?.classList.remove('hidden');
  if (popupContentElem) {
    popupContentElem.style.top = `${y}px`;
    popupContentElem.style.left = `${x}px`;
  }
};

export const closePopup = (): void => {
  popupElem?.classList.add('hidden');
};

const onClickInsidePopup = (event: Event): void => {
  event.stopPropagation();
};

popupContentElem?.addEventListener('click', onClickInsidePopup);
popupElem?.addEventListener('click', closePopup);