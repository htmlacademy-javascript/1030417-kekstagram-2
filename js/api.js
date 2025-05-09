export const getData = () => fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Ошибка');
    }
    return response.json();
  });

export const sendData = (data) => fetch('https://31.javascript.htmlacademy.pro/kekstagram/', {
  method: 'POST',
  body: new FormData(data),
}).then((response) => {
  if (!response.ok) {
    throw new Error('Ошибка при отправке данных');
  }
  return response.json();
});
