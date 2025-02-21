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

    const response = await axios.patch(
      `${import.meta.env.VITE_URL}/tasks/${data._id}`,
      updateObj
    );
    if (response.data) {
      Swal.fire({
        title: "Good job!",
        text: "Task Updated sucessfully!",
        icon: "success",
      });
        navigate(-1); 
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-semibold text-center mb-5">Update Task</h1>
      <form onSubmit={handelUpdate} className="space-y-4">
        {/* Title Input */}
        <div>
          <label className="block font-semibold">Title (Max 50 chars):</label>
          <input
            type="text"
            maxLength="50"
            required
            name="title"
            defaultValue={data.title}
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        {/* Description Input */}
        <div>
          <label className="block font-semibold">
            Description (Max 200 chars):
          </label>
          <textarea
            maxLength="200"
            name="description"
            defaultValue={data.description}
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        {/* Category Select */}
        <div>
          <label className="block font-semibold">Category:</label>
          <select
            name="category"
            defaultValue={data.category}
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
          Update Task
        </button>
      </form>
    </div>
  );
};

export default Edit;
