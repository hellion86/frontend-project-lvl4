/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import routes from '../../routes.js';

const Page404 = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <h1 className="h4 text-muted">{t('notFoundPage.notFound')}</h1>
      <p className="text-muted">{t('notFoundPage.jumpTo')}</p>
      <Link to={routes.chatPage()}>{t('notFoundPage.linkToMain')}</Link>
    </div>
  );
};

export default Page404;
