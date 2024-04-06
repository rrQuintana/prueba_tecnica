import { createSlice } from "@reduxjs/toolkit";
import sessionService from "./session.service";

const loggedUserJSON = window.localStorage.getItem("loggedUser");
const loggedUser = JSON.parse(loggedUserJSON);

const initialState = {
  user: loggedUser?.user || null,
  token: loggedUser?.token || null,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSession: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;

      window.localStorage.setItem(
        "loggedUser",
        JSON.stringify({ user, token })
      );
    },
    clearSession: (state) => {
      state.user = null;
      state.token = null;

      window.localStorage.removeItem("loggedUser");
    },
  },
});

export const { setSession, clearSession } = sessionSlice.actions;

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const loggedUser = await sessionService.login(credentials);

      if (loggedUser) {
        dispatch(setSession(loggedUser));
      } else {
        return { error: "Usuario o contraseña incorrectos" };
      }
    } catch (error) {
      return { error: "Error al iniciar sesión" };
    }
  };
};

export default sessionSlice.reducer;
