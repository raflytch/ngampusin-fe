import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { authService } from "@/services/auth.service";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} from "@/features/auth/authSlice";
import { LoginRequest, LoginResponse, LoginError } from "@/types/auth.types";
import { RootState } from "@/store";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    const error = queryParams.get("error");

    if (token) {
      try {
        authService.handleGoogleCallback(token);
        const decoded = jwtDecode<any>(token);
        const user = {
          id: decoded.sub,
          name: decoded.name,
          email: decoded.email,
          fakultas: decoded.fakultas,
          avatar: decoded.avatar,
          role: decoded.role,
        };
        dispatch(loginSuccess(user));
        navigate("/post", { replace: true });
      } catch (error) {
        dispatch(loginFailure("Failed to authenticate with Google"));
        navigate("/auth/login?error=invalid-token", { replace: true });
      }
    } else if (error) {
      dispatch(loginFailure("Google authentication failed"));
    }
  }, [location, dispatch, navigate]);

  const loginMutation = useMutation<LoginResponse, LoginError, LoginRequest>({
    mutationFn: (data) => {
      dispatch(loginStart());
      return authService.login(data);
    },
    onSuccess: (data) => {
      dispatch(loginSuccess(data.user));
      navigate("/post");
    },
    onError: (error) => {
      dispatch(loginFailure(error.message));
    },
  });

  const handleGoogleLogin = () => {
    dispatch(loginStart());
    authService.googleLogin();
  };

  const handleLogout = () => {
    authService.logout();
    dispatch(logout());
    navigate("/auth/login");
  };

  return {
    login: loginMutation.mutate,
    googleLogin: handleGoogleLogin,
    isLoggingIn: loginMutation.isPending,
    isLoginError: loginMutation.isError,
    loginError: loginMutation.error,
    logout: handleLogout,
    isAuthenticated,
    user,
  };
};
