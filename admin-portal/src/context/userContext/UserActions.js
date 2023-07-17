export const getUsersStart = () => ({
    type: "GET_USERS_START",
  });
  
  export const getUsersSuccess = (users) => ({
    type: "GET_USERS_SUCCESS",
    payload: users,
  });
  
  export const getUsersFailure = () => ({
    type: "GET_USERS_FAILURE",
  });
  
  export const createUsersStart = () => ({
    type: "CREATE_USERS_START",
  });
  
  export const createUsersSuccess = (users) => ({
    type: "CREATE_USERS_SUCCESS",
    payload: users,
  });
  
  export const createUsersFailure = () => ({
    type: "CREATE_USER_FAILURE",
  });
  
  export const updateUsersStart = () => ({
    type: "UPDATE_USERS_START",
  });
  
  export const updateUsersSuccess = (users) => ({
    type: "UPDATE_USERS_SUCCESS",
    payload: users,
  });
  
  export const updateUsersFailure = () => ({
    type: "UPDATE_USERS_FAILURE",
  });
  
  export const deleteUsersStart = () => ({
    type: "DELETE_USERS_START",
  });
  
  export const deleteUsersSuccess = (id) => ({
    type: "DELETE_USERS_SUCCESS",
    payload: id,
  });
  
  export const deleteUsersFailure = () => ({
    type: "DELETE_USERS_FAILURE",
  });
  