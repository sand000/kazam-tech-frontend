import { useState } from "react";
import mqttClient from "../services/mqttClient";
import plusicon from "../assets/plus.svg";

const TaskForm = ({ onTaskAdded }) => {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    if (!mqttClient.connected) {
      console.warn("MQTT client not connected!");
      return;
    }

    mqttClient.publish("/add", JSON.stringify({ task }));

    setTask("");
    if (onTaskAdded) onTaskAdded(task);
  };

  return (
    <form onSubmit={handleSubmit} className='mt-4 w-full'>
      <div className='flex flex-wrap gap-4 mt-2 w-full'>
        <input
          style={{ "--placeholder-color": "#D3D4D9" }}
          type='text'
          className='p-4 border rounded-xl shadow-lg text-xl sm:text-2xl placeholder:text-xl sm:placeholder:text-2xl placeholder:font-normal flex-1 min-w-[250px]'
          placeholder='New Note...'
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        {/* Add Button */}
        <button
          type='submit'
          className='bg-amber-800 text-white px-6 py-4 rounded-xl flex items-center justify-center gap-2'
        >
          <img className='h-9 w-9 sm:h-8 sm:w-8' src={plusicon} alt='plus icon' />
          <span className='font-bold text-lg sm:text-2xl'>Add</span>
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
