import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  const authRoutes = ["/auth/login", "/auth/register"];
  const showNavbar = !authRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {showNavbar && <Navbar />}
      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default MainLayout;
