import React, { useState } from "react";

import { Formik } from "formik";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/actions/usersActions";

import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const {error} = useSelector(state => state.login)

  

  return (
    <div className="section-content">
      <Container>
        <Row>
          <Col lg={5} className="mx-lg-auto">
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validate={(values) => {
                const errors = {};

               
                if (!values.email) {
                  errors.email = "Email is Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                }

                if (!values.password) {
                  errors.password = "Password is Required";
                } else if (values.password.length < 5) {
                  errors.password = "Must be 5 characters or less";
                }


                return errors;
              }}
              onSubmit={(values, actions) => {
                dispatch(login({values,callback:()=> navigate('/users')}));
              }}
              
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
              }) => (
                <Form onSubmit={handleSubmit} className="shadow p-4 rounded">
                  <Form.Group className="mb-3">
                    <Form.Label>email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    <span className="text-danger label-error">
                      {errors.email && touched.email && errors.email}
                    </span>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>password </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    <span className="text-danger label-error">
                      {errors.password && touched.password && errors.password}
                    </span>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Button type="submit">Submit</Button>
                  </Form.Group>
                  {error && <p>{error}</p>}
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
