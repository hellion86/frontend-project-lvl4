import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

const modalMapper = (content, id, channelName, type) => {
  const action = {
    remove: () => content.removeChannel(id),
    add: () => content.addChannel(channelName),
    rename: () => content.renameChannel(id, channelName),
  };
  return action[type];
};

const PrepareStateFormik = (action, channelName) => {
  const { t } = useTranslation();
  const types = {
    buttonText: t(`channelsList.modal.${action}.button`),
    headerText: t(`channelsList.modal.${action}.header`),
    placeHolderText: t(`channelsList.modal.${action}.holderText`),
    buttonClass: {
      add: 'primary',
      rename: 'primary',
      remove: 'danger',
    },
  };

  return {
    action,
    channelName,
    placeHolderText: types.placeHolderText,
    headerText: types.headerText,
    buttonText: types.buttonText,
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
export { validateSchema, PrepareStateFormik, modalMapper };
