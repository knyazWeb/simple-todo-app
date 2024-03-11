import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/globals.scss";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes.tsx";
import Store from "./store/store.ts";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    
    <Provider store={Store}>
      <RouterProvider router={router} />
    </Provider>
    
  </React.StrictMode>
);
