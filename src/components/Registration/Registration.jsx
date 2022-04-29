/* eslint-disable */

import React from "react";
import ReactDOM from "react-dom";
import { Formik } from "formik";
import { Form, Button, Container, Card, FloatingLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import registrationImage from "../../../assets/image/registrationPage.jpg";

const schema = Yup.object().shape({
  name: Yup.string().required('Вы не ввели имя пользователя').min(3, "Имя должно быть больше 3ех символов"),
  password: Yup.string().required('Вы не ввели пароль'),
  passwordConfirm: Yup.string()
    .required('Необходимо подтвердить пароль')
    .oneOf([Yup.ref("password")], "Пароли должны совпадать"),
});

const Registration = () => {
  return (
    <Formik
      initialValues={{
        name: "",
        password: "",
        passwordConfirm: "",
      }}
      validateOnBlur
      validationSchema={schema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          // setSubmitting(false);
        }, 1500);
      }}
    >
      {({ handleSubmit, handleChange, handleBlur, dirty, isValid, touched, errors, values }) => (
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
                    <h1 className="text-center mb-4"> Регистрация </h1>
                    <Form.Group controlId="validationFormikUserName">
                      <FloatingLabel
                        controlId="floatingInputName"
                        label="Имя пользователя"
                        className="mb-4"
                      >
                        <Form.Control
                          type="text"
                          name="name"
                          value={values.name}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          isInvalid={!!errors.name}
                          placeholder="username"
                        />
                        <Form.Control.Feedback type="invalid">
                          {touched.name && errors.name}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>

                    <Form.Group
                      controlId="validationFormikPassword"
                      className="mb-4"
                    >
                      <FloatingLabel
                        controlId="floatingInputPassword"
                        label="Пароль"
                      >
                        <Form.Control
                          type="password"
                          name="password"
                          value={values.password}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          isInvalid={!!errors.password}
                          placeholder="password"
                        />
                        <Form.Control.Feedback type="invalid">
                          {touched.password && errors.password}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>

                    <Form.Group
                      controlId="validationFormikPasswordConfirm"
                      className="mb-4"
                    >
                      <FloatingLabel
                        controlId="validationFormikPasswordConfirm"
                        label="Подтвердите пароль"
                      >
                        <Form.Control
                          type="password"
                          name="passwordConfirm"
                          value={values.passwordConfirm}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          isInvalid={!!errors.passwordConfirm}
                          placeholder="password"
                        />
                        <Form.Control.Feedback type="invalid">
                          {touched.passwordConfirm && errors.passwordConfirm}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>

                    <Button
                      type="submit"
                      className="w-100"
                      variant="outline-primary"
                      disabled={!isValid && !dirty}
                    >
                      Зарегистрироваться
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
