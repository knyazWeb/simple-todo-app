import { createBrowserRouter } from "react-router-dom";
import Registration from "../pages/registration /Registration.tsx";
import App from "../App.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Registration />,

  },
  {
    path: "/home",
    element: <App />,
  }
])
