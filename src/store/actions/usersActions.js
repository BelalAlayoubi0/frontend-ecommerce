import {
  GET_USERS,
  USERS_ERROR,
  REGSITER_REQUEST,
  REGSITER_ERROR,
  REGSITER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_REQUEST,
  GET_USER,
  REMOVE_USER,
  USER_ERROR,
  SUCCESS_USER,
  UPDATEPROFILE_ERROR,
  UPDATEPROFILE_SUCCESS,
  UPDATEPROFILE_REQUEST,
  GET_SINGLE_USER,
  SUCCESS_SINGLE_USER,
  SUCCESS_UPDATE_SINGLE_USER,
  UPDATE_SINGLE_USER,
  ORDER_GET,
  ORDER_SUCCESS,
  ORDER_ERROR,
  ORDER_REQUEST
} from "./types";
import axios from "axios";
import Cookies from "js-cookie";
import axiosApp from "../../api";
import { Navigate, useNavigate } from "react-router-dom";

export const getUsers = () => async (dispatch) => {
  try {
    const response = await axiosApp.get(`/users`);
    dispatch({
      type: GET_USERS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: USERS_ERROR,
      payload: console.log(e),
    });
  }
};

export const register = ({values , callback}) => async (dispatch) => {
  dispatch({
    type: REGSITER_REQUEST,
  });
  try {
    const res = await axiosApp.post(`/users`, values);
    dispatch({
      type: REGSITER_SUCCESS,
      payload: res.data,
    });
    callback();
  } catch (e) {
    dispatch({
      type: REGSITER_ERROR,
      payload: console.log(e),
    });
  }
};

export const login =
  ({ values, callback }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: LOGIN_REQUEST,
      });
      let response = await axiosApp.post(`/users/login`, values);
      // console.log(response.data.name)
      dispatch({
        type: LOGIN_SUCCESS,
        // payload: response.data.name,
      });
      // console.log(response.data);
      Cookies.set("token", response.data.token);
      Cookies.set("user", JSON.stringify(response.data));
      callback();
      window.location.reload()
    } catch (error) {
      console.log(error.response.data.message);
      dispatch({
        type: LOGIN_ERROR,
        payload: error.response.data.message,
      });
    }
  };




  
export const updateProfile =
({ values}) =>
async (dispatch) => {
  try {
    dispatch({
      type: UPDATEPROFILE_REQUEST,
    });
    let response = await axiosApp.put(`/users/profile`, values);
    // console.log(response.data.name)
    dispatch({
      type: UPDATEPROFILE_SUCCESS,
      // payload: response.data.name,
    });
    // console.log(response.data);
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: UPDATEPROFILE_ERROR,
      payload: error.response.data.message,
    });
  }
};




  export const getUser = () => async (dispatch) => {
    try {
      dispatch({
        type: GET_USER,
      });
      const response = await axiosApp.get(`/users/profile`);
      // console.log(response.data)
      dispatch({
        type: SUCCESS_USER,
        payload: response.data,
      });
    } catch (e) {
      // dispatch({
      //   type: USERS_ERROR,
      //   payload: console.log(e),
      // });
    }
  };
  



  export const getUserSingle = (id) => async (dispatch) => {
    // console.log( 'id :' ,  id)
    try {
      dispatch({
        type: GET_SINGLE_USER,
      });
      const response = await axiosApp.get(`/users/${id}`);
      // console.log(response.data)
      dispatch({
        type: SUCCESS_SINGLE_USER,
        payload: response.data,
      });
    } catch (e) {
      // dispatch({
      //   type: USERS_ERROR,
      //   payload: console.log(e),
      // });
    }
  };


  

  
  
  export const updateUserSingle = ({id , values , callback}) => async (dispatch) => {
    
    console.log( 'id :' ,  id)
    try {
      dispatch({
        type: UPDATE_SINGLE_USER,
      });
      const response = await axiosApp.put(`/users/${id}` , values);
      // console.log(response.data)
      await dispatch({
        type: SUCCESS_UPDATE_SINGLE_USER,
        payload: response.data,
      })
      callback();
    } catch (e) {
      dispatch({
        type: USERS_ERROR,
        payload: console.log(e),
      });
    }
  };


  export const deleteUser =
  ( id ) =>
  async (dispatch) => {
    try {
      await axiosApp.delete(`/users/${id}`);
      dispatch(getUsers())
    } catch (error) {
    }
  };
  



  
export const getOrder = () => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_REQUEST,
    });
    const response = await axiosApp.get(`/orders/myOrders`);
    dispatch({
      type: ORDER_SUCCESS,
      payload: response.data,
    });
    console.log(response.data)
  } catch (e) {
    dispatch({
      type: ORDER_ERROR,
      payload: console.log(e),
    });
  }
};
