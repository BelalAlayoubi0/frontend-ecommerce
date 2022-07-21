import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  getUserSingle,
  remoeUser,
  updateUserSingle,
} from "../store/actions/usersActions";
import Button from "react-bootstrap/Button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import { Formik } from "formik";

function User(match) {

  let navigate = useNavigate();

  let { id } = useParams();
  // console.log(id)

  const { userSingle, loading } = useSelector((state) => state.userSingle);

  const [checked, setChecked] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserSingle(id));
  }, []);

  useEffect(() => {
    if (!!userSingle && !loading) {
      const { isAdmin } = userSingle;
      setChecked(isAdmin);
    }
    //
  }, [userSingle,loading]);

  // {userSingle ? setChecked(userSingle.isAdmin)}

  const handleChangeCheckbox = () => {
    setChecked(!checked);
    // userSingle ? setChecked(userSingle.isAdmin)
  };

  return (
    <div>
      {loading ? (
        <div>loding ...</div>
      ) : (
        <Container className="py-5">
          <Row className="justify-content-md-center">
            <Col lg={5}>
              {/* {user ?  user.name : ''} */}
              {userSingle ? (
                <Formik
                  initialValues={{
                    name: userSingle?.name,
                    email: userSingle?.email
                  }}
                  validate={(values) => {
                    const errors = {};
                    console.log(values)

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

                    return errors;
                  }}
                  onSubmit={(values, actions) => {
                    values = { ...values, isAdmin: checked };
                    // dispatch(updateUserSingle({ id, values }));
                    // dispatch(updateUserSingle({{values , id} , callback:()=> Navigate('/users')}));
                    dispatch(updateUserSingle({ id, values  , callback:()=> navigate('/users') } ));
                    actions.setSubmitting(false);
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleSubmit,
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
                          // onBlur={handleBlur}
                          defaultValue={!!values.name && values.name}
                          value={!!values.name && values.name }
                          isInvalid={!!errors.name}
                        />
                        <span className="text-danger label-error">
                          {!!errors.name ? errors.name : ""}
                        </span>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="email"
                          onChange={handleChange}
                          // onBlur={handleBlur}
                          defaultValue={!!values.email && values.email}
                          value={!!values.email && values.email}
                          isInvalid={!!errors.email}
                        />
                        <span className="text-danger label-error">
                          {!!errors.email ? errors.email : ""}
                        </span>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                        <Form.Check
                          type="checkbox"
                          label="Is Admin"
                          // name="isAdmin"
                          // onBlur=/{handleBlur}
                          checked={checked}
                          onChange={handleChangeCheckbox}
                          // value={values.isAdmin || initialValues.isAdmin}
                        />
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
          </Row>
        </Container>
      )}
    </div>
  );
}

export default User;
