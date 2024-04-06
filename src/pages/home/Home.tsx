import { useGetTasksQuery } from "../../services/TasksService";
import Task from "../../components/task/Task.tsx";
import { useAppSelector } from "../../hooks/redux.ts";
import { selectUser } from "../../store/reducers/authSlice.ts";
import Loading from "../loading/Loading.tsx";

const Home = () => {
  const { isAuth, userId } = useAppSelector(selectUser);
  const { data, isLoading } = useGetTasksQuery(userId, { skip: !isAuth });

  const dataTasksKeys = data && Object.keys(data).filter((key) => data[key].status === "In progress");
  return (
    <>
      <div className="w-full pb-16">
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
