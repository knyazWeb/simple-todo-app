import { Navigate, useNavigate } from "react-router-dom";
import Loading from "../../components/loading/Loading.tsx";
import Task from "../../components/tasks/Task/Task.tsx";
import { useAppSelector } from "../../hooks/redux.ts";
import { useGetTasksQuery } from "../../services/TasksService";
import { selectUser } from "../../store/reducers/authSlice.ts";
import UserHeader from "../../components/userHeader/UserHeader.tsx";
import { VscSync } from "react-icons/vsc";

import Card from "../../components/card/Card.tsx";
import { FaRegClock } from "react-icons/fa6";

import { LuFileCheck } from "react-icons/lu";
import { LuFileX } from "react-icons/lu";

const Home = () => {
  const { isAuth, userId } = useAppSelector(selectUser);
  const { data, isLoading, isError } = useGetTasksQuery(userId, { skip: !isAuth });
  const navigate = useNavigate();
  const dataTasksKeys = data && Object.keys(data).slice(-3).reverse();
  const tasksStatus = {
    onGoing: 0,
    inProcess: 0,
    completed: 0,
    canceled: 0,
  };
  if (data) {
    for (const key in data) {
      if (data[key].status === "On going") {
        tasksStatus.onGoing += 1;
      }
      if (data[key].status === "In process") {
        tasksStatus.inProcess += 1;
      }
      if (data[key].status === "Completed") {
        tasksStatus.completed += 1;
      }
      if (data[key].status === "Canceled") {
        tasksStatus.canceled += 1;
      }
    }
  }

  if (!isAuth && isError) {
    return <Navigate to="/registration" replace />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full pb-20">
      <div className="mb-6">
        <UserHeader />
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-3 mb-7">
        <Card
          onClick={() => navigate("/ongoing")}
          bgColor="bg-blue-400"
          type="On going"
          taskCount={tasksStatus.onGoing}>
          <VscSync size={20} color="white" />
        </Card>
        <Card
          onClick={() => navigate("/inprocess")}
          bgColor="bg-yellow-500"
          type="In process"
          taskCount={tasksStatus.inProcess}>
          <FaRegClock size={20} color="white" />
        </Card>
        <Card
          onClick={() => navigate("/completed")}
          bgColor="bg-teal-500"
          type="Completed"
          taskCount={tasksStatus.completed}>
          <LuFileCheck size={20} color="white" />
        </Card>
        <Card
          onClick={() => navigate("/canceled")}
          bgColor="bg-red-400"
          type="Canceled"
          taskCount={tasksStatus.canceled}>
          <LuFileX size={20} color="white" />
        </Card>
      </div>
      <div>
        <span className="block mb-2 text-lg">{dataTasksKeys && "Recent Tasks"}</span>
        <div className="flex flex-col gap-4">
          {dataTasksKeys &&
            dataTasksKeys.map((key) => {
              const task = data[key];
              return (
                <Task
                  key={key}
                  id={key}
                  title={task.title}
                  date={task.date}
                  description={task.description}
                  status={task.status}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Home;
