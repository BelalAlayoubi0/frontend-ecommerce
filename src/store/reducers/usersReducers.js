import { GET_SINGLE_USER, GET_USER, GET_USERS, LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, ORDER_GET, ORDER_REQUEST, ORDER_SUCCESS, REGSITER_ERROR, REGSITER_REQUEST, REGSITER_SUCCESS, REMOVE_USER, SUCCESS_SINGLE_USER, SUCCESS_UPDATE_SINGLE_USER, SUCCESS_USER, UPDATEPROFILE_REQUEST, UPDATEPROFILE_SUCCESS, UPDATE_SINGLE_USER, USERS_ERROR, USER_ERROR } from "../actions/types";

const initialStateLogin = {
  users: [],
  loading: false,
  error:"",
  loggedIn:false
};

const initialStateProfile = {
  users: [],
  loading: false,
  error:"",
};


const initialStateRegister = {
    users: [],
    loading: false,
    error:""
  };
  ;

const initialStateUser = {
    user: null,
    loading: false,
    error:"",
  };



  const initialStateUserSingle = {
    usersSingle: null,
    loading: false,
    error:"",
  };

  
  const initialStateUpdateUserSingle = {
    user: null,
    loading: false,
    error:"",
  };
  
  
  const initialStateCurrentUser = {
    user: null,
    loading: false,
    error:"",
    loggedIn:false
  };
  

const initialStateUsers = {
    users:[],
    loading:true
}



const initialStateOrder = {
  order:[],
  loading:false
}



const initialStateUserDelete = {
  loading:true
}



  

export const login = function (state = initialStateLogin, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
        return {
            ...state,
            loading: true,
          };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn:true
      };
    case LOGIN_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
    default:
      return state;
  }
}

// export const loogout = function (state = initialStateLogin, action) {
//   switch (action.type) {
//     case LOG_OUT:
//         return {
//             loggedIn:false
//           };
//     default:
//       return state;
//   }
// }


export const register = function (state = {initialStateRegister}, action) {
    switch (action.type) {
      case REGSITER_REQUEST:
        return {
          ...state,
          loading: true
        };
      case REGSITER_SUCCESS:
          return {
            ...state,
            users : action.payload,
            loading: false
          };
      case REGSITER_ERROR:
          return {
            ...state,
            error : action.payload,
            loading: false
          };
      default:
        return state;
    }
  }
  

export const user = function (state = {initialStateUser}, action) {
  switch (action.type) {
    case GET_USER:
    return {
      ...state,
      loading: true,
    };
    case SUCCESS_USER:
    return {
      ...state,
      loading: false,
      user: action.payload,
    };
    default:
      return state;
  }
}




export const updateProfile = function (state = initialStateProfile, action) {
  switch (action.type) {
    case UPDATEPROFILE_REQUEST:
    return {
      ...state,
      users:action.payload,
      loading:false
    };
    case UPDATEPROFILE_SUCCESS:
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
    default:
      return state;
  }
}







export const users = function (state = initialStateUsers, action) {
  switch (action.type) {
    case GET_USERS:
    return {
      ...state,
      users:action.payload,
      loading:false
    };
    case USERS_ERROR:
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
    default:
      return state;
  }
}


// 






export const userSingle = function (state = initialStateUserSingle, action) {
  switch (action.type) {
    case GET_SINGLE_USER:
    return {
      ...state,
      loading:false,
      userSingle:action.payload,
    };
    case SUCCESS_SINGLE_USER:
    return {
      ...state,
      loading: false,
      error: action.payload,
      userSingle:action.payload,
    };
    default:
      return state;
  }
}




export const updateUserSingle = function (state = initialStateUpdateUserSingle, action) {
  switch (action.type) {
    case UPDATE_SINGLE_USER:
    return {
      ...state,
      user:action.payload,
      loading:false
    };
    case SUCCESS_UPDATE_SINGLE_USER:
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
    default:
      return state;
  }
}


export const userDelete = function (state = initialStateUserDelete, action) {
  switch (action.type) {
    case REMOVE_USER:
      return {
        ...state,
        loading:false
      };
    default:
      return state;
  }
}




// export const currentUser = (state = initialStateCurrentUser, action) => {
//   switch(action.type){
//     case "LOG_IN":
//       return {
//         loggedIn: true
//       }
//     case "LOG_OUT":
//       return {
//         loggedIn: false
//       }
//       default:
//           return state
//   }
// }


// 




export const order = function (state = initialStateOrder, action) {
  switch (action.type) {
    case ORDER_REQUEST:
    return {
      ...state,
      order:action.payload,
      loading:true
    };
    case ORDER_SUCCESS:
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
    default:
      return state;
  }
}