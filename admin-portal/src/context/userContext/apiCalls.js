import axios from "axios";
import {
  createUsersFailure,
  createUsersStart,
  createUsersSuccess,
  deleteUsersFailure,
  deleteUsersStart,
  deleteUsersSuccess,
  getUsersFailure,
  getUsersStart,
  getUsersSuccess,
} from "./UserActions";
import { getStorage } from "firebase/storage";


export const getUsers = async (dispatch) => {
  
  dispatch(getUsersStart());
  // const data=JSON.parse(getStorage.getItem("user"));
  // console.log("DATAAAAAAA",data);
  
  try {
    const res = await axios.get("/users", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    console.log("RESSSSSSSSSSSSSSSS",res.data);
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailure());
  }
};

//create
export const createUsers = async (users, dispatch) => {
  dispatch(createUsersStart());
  try {
    const res = await axios.post("/auth/register", users, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(createUsersSuccess(res.data));
  } catch (err) {
    dispatch(createUsersFailure());
  }
};

//delete
export const deleteUsers = async (_id, dispatch) => {
  dispatch(deleteUsersStart());
  try {
    await axios.delete("/users/" + _id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteUsersSuccess(_id));
  } catch (err) {
    dispatch(deleteUsersFailure());
  }
};
