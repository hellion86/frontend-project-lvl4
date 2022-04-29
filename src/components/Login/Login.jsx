/* eslint-disable */
import regeneratorRuntime from "regenerator-runtime";
import React, { useState } from "react";
import axios from "axios";
import { Formik } from "formik";
import {
  Form,
  Button,
  InputGroup,
  FloatingLabel,
  Container,
} from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import useAuth from "../../hooks/index.jsx";
import routes from "../../routes.js";
import loginImage from '../../../assets/image/loginPage.jpg';
import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string().required("Вы не ввели имя пользователя"),
  password: Yup.string().required("Вы не ввели пароль"),
});

const Login = (props) => {
  const [authFailed, setAuthFailed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();
  const { state } = props;
  console.log(localStorage);
  return (
    <Formik
      initialValues={{
        name: "",
        password: "",
      }}
      validationSchema={schema}
      onSubmit={async (values) => {
        setAuthFailed(false);
        try {
          const res = await axios.post(routes.getToken(), {
            username: values.name,
            password: values.password,
          });
          localStorage.setItem("userId", JSON.stringify(res.data));
          auth.logIn();
          const { from } = location.state ||
            state || { from: { pathname: "/" } };
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
      {({ handleSubmit, handleChange, touched, errors, values }) => (
        <Container fluid className="h-100">
          <div className="row justify-content-center align-content-center h-100">
            <div className="col-12 col-md-8 col-xxl-6">
              <Card className="shadow-sm">
              <Card.Body className="row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">

                  <Card.Img  src={loginImage} />
                </div>
                <Form noValidate onSubmit={handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4"> Войти </h1>
                  <Form.Group controlId="validationFormikUserName">
                    <InputGroup hasValidation>
                      <FloatingLabel
                        controlId="floatingInputName"
                        label="имя пользователя"
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                          isValid={touched.name && !errors.name}
                          isInvalid={!!errors.name || authFailed}
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
                        label="пароль"
                      >
                        <Form.Control
                          type="password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          isValid={touched.password && !errors.password}
                          isInvalid={!!errors.password || authFailed}
                          placeholder="password"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                          {authFailed ? "Такого пользователя нет" : null}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      Нет аккаунта?{" "}
                      <Link to="/registration" className="links">
                        {" "}
                        Регистрация{" "}
                      </Link>
                    </Form.Label>
                  </Form.Group>

                  <Button type="submit">Вход</Button>
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

export default Login;
