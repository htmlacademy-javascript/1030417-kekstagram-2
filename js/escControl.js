const modalStack = [];

export const openModal = (modal) => {
  modal.classList.remove('hidden');
  modalStack.push(modal);
};

export const closeModal = (modal) => {
  modal.classList.add('hidden');
  modalStack.pop();
};

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') {
    return;
  }

  const topModal = modalStack[modalStack.length - 1];
  if (!topModal) {
    return;
  }

  const activeElement = document.activeElement;

  const isEditable = activeElement.tagName === 'INPUT' ||
    activeElement.tagName === 'TEXTAREA' ||
    activeElement.isContentEditable;

  const isInTopModal = topModal.contains(activeElement);

  if (isInTopModal && isEditable) {
    return;
  }

  closeModal(topModal);
});
