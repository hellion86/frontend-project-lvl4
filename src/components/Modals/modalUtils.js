import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

const modalMapper = (content, id, dispatch, channelName, channelsAction, type) => {
  const action = {
    remove: () => {
      console.log('mapper remove work');
      content.socket.emit('removeChannel', { id });
    },
    add: () => {
      console.log('add mapper work');
      console.log(channelName);
      content.socket.emit(
        'newChannel',
        { name: channelName },
        (response) => {
          const { data } = response;
          console.log(data);
          if (response.status === 'ok') {
            dispatch(channelsAction.setCurrentChannel({ id: data.id, name: data.name }));
          }
        },
      );
    },
    rename: () => {
      content.socket.emit('renameChannel', {
        id,
        name: channelName,
      });
    },
  };
  return action[type];
};

const prepareStateFormik = (action, channelName) => {
  const { t } = useTranslation();
  const types = {
    buttonText: {
      add: t('channelsList.modal.add.button'),
      rename: t('channelsList.modal.rename.button'),
      remove: t('channelsList.modal.remove.button'),
    },
    headerText: {
      add: t('channelsList.modal.add.header'),
      rename: t('channelsList.modal.rename.header'),
      remove: t('channelsList.modal.remove.header'),
    },
    placeHolderText: {
      add: t('channelsList.modal.add.holderText'),
      rename: t('channelsList.modal.rename.holderText'),
      remove: t('channelsList.modal.remove.holderText'),
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

const validateSchema = (channelsList) => {
  Yup.setLocale({
    mixed: {
      required: 'channelsList.modal.errors.emptyField',
      notOneOf: 'channelsList.modal.errors.noOneOf',
    },
    string: {
      min: 'channelsList.modal.errors.minLength',
      max: 'channelsList.modal.errors.maxLength',
    },
  });

  return Yup.object().shape({
    channelName: Yup.string()
      .required()
      .min(3)
      .max(20)
      .notOneOf([channelsList.map((channel) => channel.name)]),
  });
};
export { validateSchema, prepareStateFormik, modalMapper };
