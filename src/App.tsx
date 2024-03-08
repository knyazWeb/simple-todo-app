import MenuPanel from "./components/menuPanel/MenuPanel.tsx";
import { useAppSelector } from "./hooks/redux.ts";
import { selectTasks } from "./store/reducers/tasksSlice.ts";

const App = () => {
  const tasks = useAppSelector(selectTasks);
  
  console.log(tasks)
  return (
    <>
      <div>
        <h1>Tasks</h1>
        <ul>
          {tasks.tasks.map((task) => (
            <li key={task.id}>{task.title} {task.description}</li>
          ))}
        </ul>
      </div>
      <MenuPanel />
    </>
  );
};

export default App;
