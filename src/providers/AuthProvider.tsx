import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { loginSuccess } from "@/features/auth/authSlice";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get("jwt");
    if (token) {
      try {
        const decoded = jwtDecode<any>(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp > currentTime) {
          const user = {
            id: decoded.sub,
            name: decoded.name,
            email: decoded.email,
            fakultas: decoded.fakultas,
            avatar: decoded.avatar,
            role: decoded.role,
          };
          dispatch(loginSuccess(user));
        } else {
          Cookies.remove("jwt");
          Cookies.remove("refreshToken");
        }
      } catch (error) {
        Cookies.remove("jwt");
        Cookies.remove("refreshToken");
      }
    }
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthProvider;
