import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { authService } from "@/services/auth.service";
import { setupAuthListener } from "@/api/api";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} from "@/features/auth/authSlice";
import { LoginRequest, LoginResponse, LoginError } from "@/types/auth.types";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const cleanup = setupAuthListener(navigate);
    return cleanup;
  }, [navigate]);

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

  const handleLogout = () => {
    authService.logout();
    dispatch(logout());
    navigate("/auth/login");
  };

  return {
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    isLoginError: loginMutation.isError,
    loginError: loginMutation.error,
    logout: handleLogout,
  };
};
