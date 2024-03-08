import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/globals.scss";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes.tsx";
import Store, { persistor } from "./store/store.ts";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
    
  </React.StrictMode>
);
