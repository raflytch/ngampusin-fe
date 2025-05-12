import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/auth.types";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const getUserFromToken = () => {
  const token = Cookies.get("jwt");
  if (token) {
    try {
      const decoded: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp > currentTime) {
        return {
          id: decoded.sub,
          name: decoded.name,
          email: decoded.email,
          fakultas: decoded.fakultas,
          avatar: decoded.avatar,
          role: decoded.role,
        };
      }
    } catch (error) {
      return null;
    }
  }
  return null;
};

const user = getUserFromToken();

const initialState: AuthState = {
  user: user,
  isAuthenticated: !!user,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      Cookies.remove("jwt");
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;

export default authSlice.reducer;
