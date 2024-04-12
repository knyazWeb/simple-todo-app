import { Navigate } from "react-router-dom";
import Loading from "../../components/loading/Loading.tsx";
import Task from "../../components/tasks/Task/Task.tsx";
import { useAppSelector } from "../../hooks/redux.ts";
import { useGetTasksQuery } from "../../services/TasksService";
import { selectUser } from "../../store/reducers/authSlice.ts";

const Home = () => {
  const { isAuth, userId } = useAppSelector(selectUser);
  const { data, isLoading, isError } = useGetTasksQuery(userId, { skip: !isAuth });
  
  if (!isAuth && isError) {
    return <Navigate to="/registration" replace />;
  }

  const dataTasksKeys = data && Object.keys(data).filter((key) => data[key].status === "In progress");
  return (
    <>
      <div className="w-full pb-20">
        <h1 className="text-start text-3xl font-semibold mb-4">Tasks</h1>
        <div className="flex flex-col gap-4">
          {isLoading && <Loading />}

          {data && dataTasksKeys?.length
            ? dataTasksKeys.map((key) => {
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
              })
            : isLoading || <p className="text-center text-2xl">No tasks</p>}
        </div>
      </div>
    </>
  );
};

export default Home;
