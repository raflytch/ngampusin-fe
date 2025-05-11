import { JSX, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "./routes/routes";
import { useSelector } from "react-redux";
import { RootState } from "./store";

const App = (): JSX.Element => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
    </Suspense>
  );
};

export default App;
