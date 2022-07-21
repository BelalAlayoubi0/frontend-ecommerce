import React, { useState } from "react";

import { Formik } from "formik";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { register } from "../store/actions/usersActions";

import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Register() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="section-content">
      <Container>
        <Row>
          <Col lg={5} className="mx-lg-auto">
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validate={(values) => {
                const errors = {};

                if (!values.name) {
                  errors.name = "Name is Required";
                } else if (values.name.length > 15) {
                  errors.name = "Must be 15 characters or less";
                }

                if (!values.email) {
                  errors.email = "Email is Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                }

                if (!values.password) {
                  errors.password = "Password is Required";
                } else if (values.password.length < 8) {
                  errors.password = "Must be 8 characters or less";
                }

                if (!values.confirmPassword) {
                  errors.confirmPassword = "confirm password is Required";
                } else if (values.password !== values.confirmPassword) {
                  errors.confirmPassword = "Password does not match";
                }

                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                dispatch(register(values));
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
                    <Form.Label>name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                    <span className="text-danger label-error">
                      {errors.name && touched.name && errors.name}
                    </span>
                  </Form.Group>
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
                    <Form.Label>confirm password</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      placeholder="confirm password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                    />
                    <span className="text-danger label-error">
                      {errors.confirmPassword &&
                        touched.confirmPassword &&
                        errors.confirmPassword}
                    </span>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Button type="submit">Submit</Button>
                  </Form.Group>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Register;
