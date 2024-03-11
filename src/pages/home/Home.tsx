import MenuPanel from "../../components/menuPanel/MenuPanel";
import { useGetTasksQuery } from "../../services/TasksService";



const Home = () => {
  
  const {data, error, isLoading} = useGetTasksQuery()
  
  return (
    <>
      <div>
        <h1>Tasks</h1>
        {isLoading && <p>Loading...</p>}
        <ul>
          {data && data.map((task, index) => (
            <li key={task.id}>
              {index + 1} {task.title} {task.description} {task.date} {task.status}
            </li>
          ))}
        </ul>
      </div>
      <MenuPanel />
    </>
  );
}

export default Home