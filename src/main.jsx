import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import LoginContext from "./context/LoginContext";
import "./index.css";
import Routes from "./routes/Routes";

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
          <QueryClientProvider client={queryClient}>

    <LoginContext>
        <Routes />
      </LoginContext>
      </QueryClientProvider>

  </StrictMode>
);
