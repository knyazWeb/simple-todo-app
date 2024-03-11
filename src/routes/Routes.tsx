import { createBrowserRouter } from "react-router-dom";
import Registration from "../pages/registration /Registration.tsx";
import NewTask from "../pages/newTask/NewTask.tsx";
import Home from "../pages/home/Home.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Registration />,

  },
  {
    path: "home",
    element: <Home />,
  },
  {
    path: "createTask",
    element: <NewTask />,
  }
]);

