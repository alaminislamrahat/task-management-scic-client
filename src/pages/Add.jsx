import axios from "axios";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { FormContext } from "../context/LoginContext";

const Add = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("To-Do");
  const { user } = useContext(FormContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return; // Prevent empty title submission

    const newTask = {
      taskID: Date.now(),
      title,
      description,
      category,
      timestamp: new Date().toLocaleString(),
      email: user.email,
    };

    const res = await axios.post(`${import.meta.env.VITE_URL}/task`, newTask);
    if (res.data.insertedId) {
      Swal.fire({
        title: "Good job!",
        text: "Task Added sucessfully!",
        icon: "success",
      });
    }

    setTasks([...tasks, newTask]);
    setTitle("");
    setDescription("");
    setCategory("To-Do");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10  p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Create a Task</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label className="block font-semibold">Title (Max 50 chars):</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength="50"
            required
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        {/* Description Input */}
        <div>
          <label className="block font-semibold">
            Description (Max 200 chars):
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength="200"
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        {/* Category Select */}
        <div>
          <label className="block font-semibold">Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded mt-1"
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-green-300 hover:text-gray-500"
        >
          Add Task
        </button>
      </form>

      {/* Task List */}
      {/* <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Task List</h3>
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="bg-gray-200 p-3 rounded mt-2">
              <strong>{task.title}</strong> ({task.category})<br />
              <small>{task.description}</small><br />
              <span className="text-gray-500 text-sm">{task.timestamp}</span>
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default Add;
