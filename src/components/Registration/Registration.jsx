/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import { Formik } from 'formik';
import {
  Form, Button, Container, Card, FloatingLabel,
} from 'react-bootstrap';
import * as Yup from 'yup';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/useAuth.jsx';
import routes from '../../routes.js';
import registrationImage from '../../../assets/image/registrationPage.jpg';

const Registration = (props) => {
  const auth = useAuth();
  const { state } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [authFailed, setAuthFailed] = useState(false);
  Yup.setLocale({
    mixed: {
      required: ({ path }) => `registrationForm.errors.${path}Required`,
      oneOf: 'registrationForm.errors.oneOf',
    },
    string: {
      min: ({ path }) => `registrationForm.errors.${path}MinLength`,
      max: 'registrationForm.errors.nameMaxLength',
    },
  });
  const schema = Yup.object().shape({
    name: Yup.string()
      .required()
      .min(3)
      .max(20),
    password: Yup.string().min(6).required(),
    passwordConfirm: Yup.string()
      .required()
      .oneOf([Yup.ref('password')]),
  });

  return (
    <Formik
      initialValues={{
        name: '',
        password: '',
        passwordConfirm: '',
      }}
      validateOnBlur
      validationSchema={schema}
      onSubmit={async (values) => {
        setAuthFailed(false);
        try {
          const res = await axios.post(routes.signupUser(), {
            username: values.name,
            password: values.password,
          });
          auth.setUserToLocalStorage(res.data);
          auth.logIn();
          const { from } = location.state || state || { from: { pathname: '/' } };
          navigate(from);
        } catch (err) {
          if (err.isAxiosError && err.response.status === 409) {
            setAuthFailed(true);
            return;
          }
          throw err;
        }
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        dirty,
        isValid,
        touched,
        errors,
        values,
      }) => (
        <Container fluid className="h-100">
          <div className="row justify-content-center align-content-center h-100">
            <div className="col-12 col-md-8 col-xxl-6">
              <Card className="shadow-sm">
                <Card.Body className="row p-5">
                  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <Card.Img src={registrationImage} className="w-75" />
                  </div>
                  <Form
                    onSubmit={handleSubmit}
                    className="col-12 col-md-6 mt-3 mt-mb-0"
                  >
                    <h1 className="text-center mb-4">{t('registrationForm.welcomeHeader')}</h1>
                    <FloatingLabel
                      controlId="floatingInputName"
                      label={t('registrationForm.usernameLabel')}
                      className="mb-4"
                    >
                      <Form.Control
                        type="text"
                        name="name"
                        value={values.name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        isInvalid={errors.name || authFailed}
                        placeholder={t('registrationForm.usernameLabel')}
                      />
                      <Form.Control.Feedback type="invalid">
                        { authFailed ? null : touched.name && t(`${errors.name}`)}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="floatingInputPassword"
                      label={t('registrationForm.passwordLabel')}
                      className="mb-4"
                    >
                      <Form.Control
                        type="password"
                        name="password"
                        value={values.password}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        isInvalid={errors.password || authFailed}
                        placeholder={t('registrationForm.passwordLabel')}
                      />
                      <Form.Control.Feedback type="invalid">
                        {authFailed ? null : touched.password && t(`${errors.password}`)}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="validationFormikPasswordConfirm"
                      label={t('registrationForm.passwordConfirmLabel')}
                      className="mb-4"
                    >
                      <Form.Control
                        type="password"
                        name="passwordConfirm"
                        value={values.passwordConfirm}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        isInvalid={errors.passwordConfirm || authFailed}
                        placeholder={t('registrationForm.passwordConfirmLabel')}
                      />
                      <Form.Control.Feedback type="invalid">
                        {authFailed ? t('registrationForm.errors.userExist') : touched.passwordConfirm && t(`${errors.passwordConfirm}`)}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                    <Button
                      type="submit"
                      className="w-100"
                      variant="outline-primary"
                      disabled={!isValid && !dirty}
                    >
                      {t('registrationForm.submitButton')}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </div>
          </div>
        </Container>
      )}
    </Formik>
  );
};

export default Registration;
