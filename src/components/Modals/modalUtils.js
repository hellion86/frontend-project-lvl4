import * as Yup from 'yup';
import { setLocale } from 'yup';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  setLocale({
    mixed: {
      required: t('channelsList.modal.errors.emptyField'),
      notOneOf: t('channelsList.modal.errors.noOneOf'),
    },
    string: {
      min: t('channelsList.modal.errors.minLength'),
      max: t('channelsList.modal.errors.maxLength'),
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
export { validateSchema, prepareStateFormik };
