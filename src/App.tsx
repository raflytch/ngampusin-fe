import { JSX } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "./routes/routes";
import { useAuth } from "./hooks/use-auth";
import MainLayout from "./components/layout/MainLayout";

const App = (): JSX.Element => {
  const { isAuthenticated } = useAuth();

  return (
    <MainLayout>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              route.protected && !isAuthenticated ? (
                <Navigate to="/auth/login" />
              ) : (
                <route.element />
              )
            }
          />
        ))}
      </Routes>
    </MainLayout>
  );
};

export default App;
