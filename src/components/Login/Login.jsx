/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import {
  Form, Button, FloatingLabel, Container, Card,
} from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/useAuth.jsx';
import routes from '../../routes.js';
import loginImage from '../../../assets/image/loginPage.jpg';

const Login = (props) => {
  const { t } = useTranslation();
  const [authFailed, setAuthFailed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();
  const { state } = props;

  Yup.setLocale({
    mixed: {
      required: ({ path }) => `loginForm.errors.${path}Required`,
    },
  });
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    password: Yup.string().required(),
  });

  return (
    <Formik
      initialValues={{
        name: '',
        password: '',
      }}
      validationSchema={schema}
      onSubmit={async (values) => {
        setAuthFailed(false);
        try {
          const res = await axios.post(routes.loginUser(), {
            username: values.name,
            password: values.password,
          });
          auth.setUserToLocalStorage(res.data);
          auth.logIn();
          const { from } = location.state || state || { from: { pathname: '/' } };
          navigate(from);
        } catch (err) {
          if (err.isAxiosError && err.response.status === 401) {
            setAuthFailed(true);
            return;
          }
          throw err;
        }
      }}
    >
      {({
        handleSubmit, handleChange, errors, values,
      }) => (
        <Container fluid className="h-100">
          <div className="row justify-content-center align-content-center h-100">
            <div className="col-12 col-md-8 col-xxl-6">
              <Card className="shadow-sm">
                <Card.Body className="row p-5">
                  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <Card.Img src={loginImage} className="w-75" />
                  </div>
                  <Form
                    onSubmit={handleSubmit}
                    className="col-12 col-md-6 mt-3 mt-mb-0"
                  >
                    <h1 className="text-center mb-4">
                      {t('loginForm.welcomeHeader')}
                    </h1>
                    <FloatingLabel
                      controlId="username"
                      label={t('loginForm.usernameLabel')}
                      className="mb-4"
                    >
                      <Form.Control
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        isInvalid={errors.name || authFailed}
                        placeholder="username"
                      />
                      <Form.Control.Feedback type="invalid">
                        {authFailed ? null : t(`${errors.name}`)}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="password"
                      label={t('loginForm.passwordLabel')}
                      className="mb-4"
                    >
                      <Form.Control
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={errors.password || authFailed}
                        placeholder="password"
                      />
                      <Form.Control.Feedback type="invalid">
                        {authFailed ? t('loginForm.errors.userNotExist') : t(`${errors.password}`)}
                      </Form.Control.Feedback>
                    </FloatingLabel>

                    <Button
                      type="submit"
                      className="w-100 mb-3"
                      variant="outline-primary"
                    >
                      {t('loginForm.login')}
                    </Button>
                  </Form>
                </Card.Body>
                <Card.Footer className="p-3">
                  <div className="text-center">
                    {t('loginForm.noAccount')}
                    <Link to={routes.signupPage()}>
                      {t('loginForm.registration')}
                    </Link>
                  </div>
                </Card.Footer>
              </Card>
            </div>
          </div>
        </Container>
      )}
    </Formik>
  );
};

export default Login;
