/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../routes.js';
import registrationImage from '../../../assets/image/registrationPage.jpg';

const Page404 = () => {
  return (
    <div className="text-center">
      <img src={registrationImage} />
      <h1 className="h4 text-muted">Страница не найдена</h1>
      <p className="text-muted">Но вы можете перейти </p>
      <Link to={routes.chatPage()}>на главную страницу</Link>
    </div>
  );
};

export default Page404;
