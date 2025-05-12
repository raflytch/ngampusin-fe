import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const GoogleCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const error = params.get("error");

    if (token) {
      navigate(`/post?token=${token}`, { replace: true });
    } else if (error) {
      navigate("/auth/login?error=google-auth-failed", { replace: true });
    } else {
      navigate("/auth/login", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      <p className="mt-4 text-lg">Processing authentication...</p>
    </div>
  );
};

export default GoogleCallback;
