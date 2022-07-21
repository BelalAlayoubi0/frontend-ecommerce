import { combineReducers } from 'redux'
import {login , register , user , users , userDelete , userSingle,  updateUserSingle ,order} from './usersReducers'

export default combineReducers({
  login,
  register,
  user,
  users,
  userDelete,
  userSingle,
  updateUserSingle,
  order
})