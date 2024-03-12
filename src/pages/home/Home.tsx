import MenuPanel from "../../components/menuPanel/MenuPanel";
import { useGetTasksQuery } from "../../services/TasksService";
import Task from "../../components/task/Task.tsx";

const Home = () => {
  const { data, error, isLoading } = useGetTasksQuery();

  return (
    <>
      <div className="w-full pb-16">
        <h1 className="text-center text-3xl font-semibold mb-4">Tasks</h1>
        <div className="flex flex-col gap-4">
          {isLoading && <p>Loading...</p>}

          {data && data.length
            ? data.map((task) => (
                <Task
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  date={task.date}
                  description={task.description}
                  status={task.status}
                />
              ))
            : isLoading || <p className="text-center text-2xl">No tasks</p>}
        </div>
      </div>
      <MenuPanel />
    </>
  );
};

export default Home;
