import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import { fetchAllTasks } from "./services/api";
import note from "./assets/note.svg";

function App() {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    try {
      const fetched = await fetchAllTasks();
      console.log("fetched tasks", fetched);
      setTasks(fetched);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className='flex items-center justify-center min-h-screen px-4'>
      {" "}
      <div className='mt-10 w-full max-w-[760px] border border-gray-100 shadow-xl rounded-md px-5 pt-4 pb-7'>
        {/* Header Section */}
        <div className='flex items-center gap-4 flex-wrap'>
          <img className='h-14 w-14' src={note} alt='image note' />
          <h1 className='font-bold text-4xl sm:text-5xl'>Note App</h1>
        </div>

        <div>
          <TaskForm onTaskAdded={loadTasks} />
          <div className='py-6'>
            {tasks.length > 0 ? (
              <div className='mt-4'>
                <h3 className='font-bold text-2xl sm:text-3xl'>Notes</h3>

                <hr
                  className='border-t border-gray-300 my-2 w-full border-2'
                  style={{ backgroundColor: "#D3D4D9" }}
                />

                <ul className='overflow-y-auto max-h-[400px] pr-2'>
                  {" "}
                  {/* Scrollable list */}
                  {tasks.map((task, idx) => (
                    <li key={idx}>
                      {task !== null && (
                        <div>
                          <p className='text-xl sm:text-2xl font-normal p-2 rounded normal-case'>
                            {task}
                          </p>
                          <hr
                            className='border-t border-gray-300 my-2 w-full border-2'
                            style={{ backgroundColor: "#D3D4D9" }}
                          />
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
