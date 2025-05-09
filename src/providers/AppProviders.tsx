import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { ReduxProvider } from "./ReduxProvider";
import { QueryProvider } from "./QueryProvider";

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <ReduxProvider>
      <QueryProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </QueryProvider>
    </ReduxProvider>
  );
};
