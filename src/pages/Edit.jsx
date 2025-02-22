import axios from "axios";
import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Edit = () => {
  const data = useLoaderData();
  const navigate = useNavigate(); // To navigate after the update

  const handelUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const category = form.category.value;
    const updateObj = { title, description, category };
    console.log(updateObj)

    const response = await axios.patch(
      `${import.meta.env.VITE_URL}/tasks/${data._id}`,
      updateObj
    );
    if (response.data) {
      Swal.fire({
        title: "Good job!",
        text: "Task Updated successfully!",
        icon: "success",
      });
      navigate(-1);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-gray-800 text-white shadow-lg rounded-xl border-2 border-teal-700">
      <h1 className="text-2xl font-semibold text-center mb-5 text-teal-500">Update Task</h1>
      <form onSubmit={handelUpdate} className="space-y-5">
        {/* Title Input */}
        <div>
          <label className="block font-semibold text-gray-300">Title (Max 50 chars):</label>
          <input
            type="text"
            maxLength="50"
            required
            name="title"
            defaultValue={data.title}
            className="w-full p-3 border border-gray-600 rounded-lg mt-1 focus:ring-2 focus:ring-teal-500 bg-gray-900 text-white"
          />
        </div>

        {/* Description Input */}
        <div>
          <label className="block font-semibold text-gray-300">Description (Max 200 chars):</label>
          <textarea
            maxLength="200"
            name="description"
            defaultValue={data.description}
            className="w-full p-3 border border-gray-600 rounded-lg mt-1 focus:ring-2 focus:ring-teal-500 bg-gray-900 text-white"
          />
        </div>

        {/* Category Select */}
        <div>
          <label className="block font-semibold text-gray-300">Category:</label>
          <select
            name="category"
            defaultValue={data.category}
            className="w-full p-3 border border-gray-600 rounded-lg mt-1 focus:ring-2 focus:ring-teal-500 bg-gray-900 text-white"
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-teal-600 text-white px-4 py-3 rounded-lg hover:bg-teal-700 transition duration-300"
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default Edit;
