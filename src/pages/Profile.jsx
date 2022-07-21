import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrder,
  getUser,
  updateProfile,
} from "../store/actions/usersActions";

import { Formik } from "formik";
import { Navigate } from "react-router-dom";
import Table from "react-bootstrap/Table";

function Profile() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);
  const orderState = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getUser());
    dispatch(getOrder());
  }, [dispatch]);

  console.log(orderState.order);

  return (
    <div>
      {loading ? (
        <div>loding ...</div>
      ) : (
        <Container className="py-5">
          <Row className="justify-content-md-center">
            <Col lg={3}>
              {/* {user ?  user.name : ''} */}
              {user ? (
                <Formik
                  initialValues={{
                    name: user?.name,
                    email: user?.email,
                    password: user?.password,
                    confirmPassword: user?.confirmPassword,
                  }}
                  validate={(values) => {
                    const errors = {};

                    if (!values.name) {
                      errors.name = "Name is Required";
                    } else if (values.name.length > 15) {
                      errors.name = "Must be 15 characters or less";
                    } else if (values.name.length < 5) {
                      errors.name = "Must be 5 characters or less";
                    }

                    if (!values.email) {
                      errors.email = "Email is Required";
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                        values.email
                      )
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
                  onSubmit={(values, actions) => {
                    dispatch(updateProfile({ values }));
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
                    <Form
                      onSubmit={handleSubmit}
                      className="shadow p-4 rounded"
                    >
                      <Form.Group className="mb-3">
                        <Form.Label>name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          placeholder="name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          defaultValue={user.name}
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
                          defaultValue={user.email}
                        />
                        <span className="text-danger label-error">
                          {errors.email && touched.email && errors.email}
                        </span>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>password</Form.Label>
                        <Form.Control
                          type="text"
                          name="password"
                          placeholder="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <span className="text-danger label-error">
                          {errors.password &&
                            touched.password &&
                            errors.password}
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
              ) : (
                ""
              )}
            </Col>
            <Col lg={9}>
              {orderState.order ? (
                <div>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>id</th>
                        <th>date</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Delivered</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderState.order.map((user, index) => (
                        <tr key={index}>
                          <td>{orderState.index }</td>
                          <td>{orderState.order.date}</td>
                          <td>{orderState.order.total}</td>
                          <td>{orderState.order.paid}</td>
                          <td>{orderState.order.delivered}</td>
                          <td>{orderState.order.actions}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ) : (
                "Emapty Table Order"
              )}
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default Profile;
