import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/auth.service";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} from "@/features/auth/authSlice";
import { LoginRequest, LoginResponse, LoginError } from "@/types/auth.types";
import { RootState } from "@/store";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

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
    isAuthenticated,
    user,
  };
};
