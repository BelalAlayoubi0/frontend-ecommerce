import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers, remoeUser } from "../store/actions/usersActions";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { userDelete } from "../store/reducers/usersReducers";

function Users() {

const { users , loading} = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const [user, setUser] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    dispatch(getUsers());
    console.log(users);
  }, []);


  useEffect(() => {
    
  }, [users]);


  const handleDelete = (user) => {
    setShow(true)
    setUser(user)
    console.log(user)
   };
   
   const DeletedUser = (id) => {
    dispatch(deleteUser(id));
    setShow(false)
   };

   

  return (
    <div>
      {loading ? (
        <div>loding ...</div>
      ) : (
      <Container>
        <Row className="justify-content-md-center py-5">
          <Col lg={12}>
            {users ?  (
              <div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Admin</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  
                  {users.map((user, index)=>(
                  <tr key={index}>
                    <td>{index }</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{ user.isAdmin ? (
                      <svg width="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z" fill="#37c521"/></svg>
                    ) : (
                    <svg width="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM175 208.1L222.1 255.1L175 303C165.7 312.4 165.7 327.6 175 336.1C184.4 346.3 199.6 346.3 208.1 336.1L255.1 289.9L303 336.1C312.4 346.3 327.6 346.3 336.1 336.1C346.3 327.6 346.3 312.4 336.1 303L289.9 255.1L336.1 208.1C346.3 199.6 346.3 184.4 336.1 175C327.6 165.7 312.4 165.7 303 175L255.1 222.1L208.1 175C199.6 165.7 184.4 165.7 175 175C165.7 184.4 165.7 199.6 175 208.1V208.1z" fill="#ff0000" /></svg>
                    ) }</td> 
                    <td width={200}>
                      <Button as={Link} variant="primary" to={user._id}>update</Button>{' '}
                      <Button variant="danger" onClick={() => handleDelete(user)}>deletet</Button>{' '}
                    </td>
                  </tr>
                  ))}
                </tbody>
              </Table>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Deleted User </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div>name : {user.name}</div>
                  <div> email : {user.email}</div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button variant="danger" onClick={() => DeletedUser(user._id)}>
                    Delete
                  </Button>
                </Modal.Footer>
              </Modal>
              </div>
          
            
            ):(
              ''
            )}
          </Col>
        </Row>
      </Container>
      )}
    </div>
  );
}

export default Users;
