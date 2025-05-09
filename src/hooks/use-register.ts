import { useMutation } from "@tanstack/react-query";
import { registerService } from "@/services/register.service";
import {
  RegisterRequest,
  RegisterResponse,
  RegisterError,
} from "@/types/register.types";

export const useRegister = () => {
  const registerMutation = useMutation<
    RegisterResponse,
    RegisterError,
    RegisterRequest
  >({
    mutationFn: (data) => registerService.register(data),
  });
  return {
    register: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
    isRegisterError: registerMutation.isError,
    registerError: registerMutation.error,
    isRegisterSuccess: registerMutation.isSuccess,
    registerData: registerMutation.data,
  };
};
