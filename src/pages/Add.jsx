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
    if (!title.trim()) return;

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
        title: "Success!",
        text: "Task added successfully!",
        icon: "success",
      });
    }

    setTasks([...tasks, newTask]);
    setTitle("");
    setDescription("");
    setCategory("To-Do");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-gray-800 text-white shadow-lg border-4 border-teal-700 rounded-xl">
      <h2 className="text-3xl font-bold text-center mb-6 text-teal-400">Create a Task</h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-semibold text-gray-300">Title (Max 50 chars):</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength="50"
            required
            className="w-full p-3 border border-gray-600 rounded-lg mt-1 focus:ring-2 focus:ring-teal-500 bg-gray-900 text-white"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-300">Description (Max 200 chars):</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength="200"
            className="w-full p-3 border border-gray-600 rounded-lg mt-1 focus:ring-2 focus:ring-teal-500 bg-gray-900 text-white"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-300">Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border border-gray-600 rounded-lg mt-1 focus:ring-2 focus:ring-teal-500 bg-gray-900 text-white"
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-teal-700 transition duration-300"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default Add;
