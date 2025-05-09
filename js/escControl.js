const windows = [];
let listener = null;

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    const lastWindowIndex = windows.length - 1;
    if (windows[lastWindowIndex].condition && typeof windows[lastWindowIndex].condition === 'function') {
      if (!windows[lastWindowIndex].condition()) {
        return;
      }
    }

    windows[lastWindowIndex].closeFunction();
    windows.length = windows.length - 1;

    if (!windows.length) {
      document.removeEventListener('keydown', onDocumentKeydown);
      listener = null;
    }
  }
};

export const setEscControl = (closeFunction, condition = null) => {
  windows.push({
    closeFunction,
    condition,
  });

  if (!listener) {
    listener = document.addEventListener('keydown', onDocumentKeydown);
  }
};

export const removeEscControl = () => {
  windows.length = windows.length - 1;

  if (!windows.length) {
    document.removeEventListener('keydown', onDocumentKeydown);
    listener = null;
  }
};
