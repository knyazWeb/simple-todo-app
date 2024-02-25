import { createBrowserRouter } from "react-router-dom";
import Registration from "../pages/registration /Registration.tsx";
import App from "../App.tsx";
import NewTask from "../pages/newTask/NewTask.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Registration />,

  },
  {
    path: "home",
    element: <App />,
  },
  {
    path: "createTask",
    element: <NewTask />,
  }
]);

