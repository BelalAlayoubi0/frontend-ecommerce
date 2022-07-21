import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Login, Register, Home , Cart , Users , Profile , Orders , Products  , User} from "./pages";

import ProtectedRoutes from "./ProtectedRoutes.js";
import PublicRoutes from "./PublicRoutes.js";
import Cookies from "js-cookie";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Dropdown from 'react-bootstrap/Dropdown';

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  // const { users } = useSelector((state) => state.users);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getUsers());
  //   console.log(users);
  // }, []);

  const dispatch = useDispatch();

  const [user, setUser] = useState([]);

  const [login, setLogin] = useState(false);

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    window.location.reload();
    return <Navigate to="/login" />;
  };

  useEffect(() => {
    // if (Cookies.get("token")) {
    //   setLogin(true);
    // }
    if (Cookies.get("user")) {
     let user =  JSON.parse(Cookies.get("user"))
      setUser(user);
      setLogin(true);
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar bg="light" variant="light">
          <Container>
            <Navbar.Brand href="#home">Logo</Navbar.Brand>

            {login ? (
              <Nav as="ul">
                <Nav.Item>
                  <Form.Control
                    type="text"
                    placeholder="search.."
                    name="search "
                  />
                </Nav.Item>
                <Nav.Item as="li">
                  <Nav.Link as={Link} to="/cart">
                    Cart 
                  </Nav.Link>
                </Nav.Item>
       
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Hello {user.name}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="profile">Profile</Dropdown.Item>
                    {user.isAdmin ? (
                      <div>
                        <Dropdown.Item as={Link} to="users">Users</Dropdown.Item>
                        <Dropdown.Item as={Link} to="orders">Orders</Dropdown.Item>
                        <Dropdown.Item as={Link} to="product">Product</Dropdown.Item>
                      </div>
                    ) : ('') }
                    <Dropdown.Item  onClick={logout}>logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav>
            ) : (
              <Nav as="ul">
                <Nav.Item as="li">
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Nav.Link as={Link} to="/sign-up">
                    sign-up
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            )}
          </Container>
        </Navbar>

        <Routes>
          <Route path="/home" element={<ProtectedRoutes />}>
            <Route path="/home" element={<Home />} />
          </Route>

          <Route path="/cart" element={<ProtectedRoutes />}>
            <Route path="/cart" element={<Cart />} />
          </Route>

          <Route path="/orders" element={<Orders />}>
            <Route path="/orders" element={<Orders />} />
          </Route>

          <Route path="/products" element={<Products />}>
            <Route path="/products" element={<Products />} />
          </Route>

          <Route path="/users" element={<ProtectedRoutes />}>
            <Route path="/users" element={<Users />} />
          </Route>

          <Route path="/users/:id" element={<ProtectedRoutes />}>
            <Route path="/users/:id" element={<User />} />
          </Route>

          <Route path="/profile" element={<ProtectedRoutes />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/login" element={<PublicRoutes />}>
            <Route path="/login" element={<Login />} />
          </Route>

          <Route path="/sign-up" element={<PublicRoutes />}>
            <Route path="/sign-up" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
