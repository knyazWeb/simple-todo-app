import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { useGetTasksQuery } from "../../services/TasksService";
import { selectUser } from "../../store/reducers/authSlice";
import { IoIosArrowBack } from "react-icons/io";
import ButtonIcon from "../../components/ui/Buttons/ButtonIcon/ButtonIcon";
import Loading from "../../components/loading/Loading";
import Task from "../../components/tasks/Task/Task";


const Canceled = () => {
  const { isAuth, userId } = useAppSelector(selectUser);
  const { data, isLoading } = useGetTasksQuery(userId, { skip: !isAuth });
  const navigate = useNavigate();

  const dataTasksKeys = data && Object.keys(data).filter((key) => data[key].status === "Canceled");
  return (
    <div className="w-full pb-20">
      <ButtonIcon onClick={() => navigate("/")} type="button" color="bg-gray-200" borderRadius="rounded-lg">
        <IoIosArrowBack size={25} />
      </ButtonIcon>
      <h1 className="text-center text-3xl font-medium mb-4 mt-3">Canceled tasks</h1>
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
                  bgColor="bg-red-200 bg-opacity-40"
                />
              );
            })
          : isLoading || <p className="text-center text-xl">No "Canceled" tasks</p>}
      </div>
    </div>
  );
};

export default Canceled;
