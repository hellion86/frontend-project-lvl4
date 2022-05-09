import * as Yup from 'yup';

const prepareStateFormik = (action, channelName) => {
  const types = {
    buttonText: {
      add: 'Отправить',
      rename: 'Отправить',
      remove: 'Удалить',
    },
    headerText: {
      add: 'Создать канал',
      rename: 'Переименовать канал',
      remove: 'Удалить канал',
    },
    placeHolderText: {
      add: 'Введите имя нового канала',
      rename: 'Введите новое имя канала...',
      remove: '',
    },
    buttonClass: {
      add: 'primary',
      rename: 'primary',
      remove: 'danger',
    },
  };

  return {
    action,
    channelName,
    placeHolderText: types.placeHolderText[action],
    headerText: types.headerText[action],
    buttonText: types.buttonText[action],
    buttonClass: types.buttonClass[action],
  };
};

const validateSchema = (channelsList) => Yup.object().shape({
  channelName: Yup.string()
    .required('Вы не ввели имя канал')
    .min(3, 'Имя канала не может быть меньше 3ех символов')
    .max(20, 'Имя канала не может быть больше 20 символов')
    .notOneOf([channelsList.map((channel) => channel.name)], 'Данное имя уже занято'),
});

export { validateSchema, prepareStateFormik };
