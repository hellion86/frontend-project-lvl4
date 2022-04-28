/* eslint-disable */

import React from "react";
import ReactDOM from "react-dom";
import { Formik } from "formik";
import { Form, Button, InputGroup, FloatingLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string().required().min(3, "Name must 3 or symbols"),
  password: Yup.string().required().min(3, "Please enter  10 or more symbols"),
  passwordConfirm: Yup.string().required().oneOf([Yup.ref('password')], 'Password must confirm')
 
});

const Registration = () => {
  return (
    <Formik
      initialValues={{
        name: "",
        password: "",
        passwordConfirm: "",
      }}
      validationSchema={schema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          // setSubmitting(false);
        }, 1500);
      }}
    >
      {({
        // isSubmitting,
        handleSubmit,
        handleChange,
        touched,
        errors,
        values,
      }) => (
        <>
          <h1 className="mb-4"> Регистрация </h1>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="validationFormikUserName">
              <InputGroup hasValidation>
                <FloatingLabel
                  controlId="floatingInputName"
                  label="name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    isValid={touched.name && !errors.name}
                    isInvalid={!!errors.name}
                    placeholder="username"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </InputGroup>
            </Form.Group>

            <Form.Group
              md="4"
              controlId="validationFormikPassword"
              className="mb-3"
            >
              <InputGroup hasValidation>
                <FloatingLabel
                  controlId="floatingInputPassword"
                  label="password"
                >
                  <Form.Control
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    isValid={touched.password && !errors.password}
                    isInvalid={!!errors.password}
                    placeholder="password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </InputGroup>
            </Form.Group>

            <Form.Group
              md="4"
              controlId="validationFormikConfirmPassword"
              className="mb-3"
            >
              <InputGroup hasValidation>
                <FloatingLabel
                  controlId="floatingInputConfirmPassword"
                  label="password confirm"
                >
                  <Form.Control
                    type="password"
                    name="passwordConfirm"
                    value={values.passwordConfirm}
                    onChange={handleChange}
                    isValid={touched.passwordConfirm && !errors.passwordConfirm}
                    isInvalid={!!errors.passwordConfirm}
                    placeholder="passwordConfirm"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </InputGroup>
            </Form.Group>
          
            <Button type="submit">Registration</Button>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default Registration;
