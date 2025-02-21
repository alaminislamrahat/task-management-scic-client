import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BiMessageSquareEdit } from "react-icons/bi";
import { RiDeleteBack2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FormContext } from "../context/LoginContext";

const Recorded = () => {
  const { user, loading } = useContext(FormContext);
  const {
    data: tasks = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["recorded"],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_URL}/tasks/${user?.email}`
      );
      return response.data;
    },
  });

  if (isLoading && loading) {
    return <div>Loading...</div>;
  }

  // delete task
  const handelDeleteTask = async (id) => {
    await axios
      .delete(`${import.meta.env.VITE_URL}/tasks/${id}`)
      .then((res) => {
        console.log(res.data);
        refetch();
      });
  };

  // Handle drag and drop
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Find the task that was dragged
    const task = tasks.find((task) => task._id === draggableId);

    // Update the category of the task
    task.category = destination.droppableId;

    // Update the task on the server
    axios
      .put(`${import.meta.env.VITE_URL}/tasks/${draggableId}`, task)
      .then(() => {
        refetch();
      });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-10 gap-5">
        {/* To-Do Section */}
        {tasks.length > 0 ? (
          <>
            {" "}
            <Droppable droppableId="To-Do">
              {(provided) => (
                <div
                  className="w-full"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h1 className="bg-yellow-200 text-center py-2 font-bold rounded-md">
                    To-Do
                  </h1>
                  <div className="my-2 space-y-3 cursor-pointer">
                    {tasks
                      .filter((task) => task.category === "To-Do")
                      .map((task, index) => (
                        <Draggable
                          key={task._id}
                          draggableId={task._id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-yellow-100 p-4 rounded-lg shadow-md"
                            >
                              <h2 className="text-lg font-semibold">
                                {task.title}
                              </h2>
                              <p className="text-sm text-gray-600">
                                {task.description}
                              </p>
                              <p className="text-xs text-gray-500">
                                {task.timestamp}
                              </p>
                              <div className="space-x-2 mt-2">
                                <button>
                                  {" "}
                                  <Link
                                    to={`/dashboard/recorded-task/${task._id}`}
                                    className="cursor-pointer"
                                  >
                                    <BiMessageSquareEdit size={25} />
                                  </Link>
                                </button>
                                <button
                                  className="cursor-pointer"
                                  onClick={() => handelDeleteTask(task._id)}
                                >
                                  <RiDeleteBack2Line
                                    size={25}
                                    className="text-red-500"
                                  />
                                </button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
            {/* In Progress Section */}
            <Droppable droppableId="In Progress">
              {(provided) => (
                <div
                  className="w-full"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h1 className="bg-blue-200 text-center py-2 font-bold rounded-md">
                    In Progress
                  </h1>
                  <div className="my-2 space-y-3 cursor-pointer">
                    {tasks
                      .filter((task) => task.category === "In Progress")
                      .map((task, index) => (
                        <Draggable
                          key={task._id}
                          draggableId={task._id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-blue-100 p-4 rounded-lg shadow-md"
                            >
                              <h2 className="text-lg font-semibold">
                                {task.title}
                              </h2>
                              <p className="text-sm text-gray-600">
                                {task.description}
                              </p>
                              <p className="text-xs text-gray-500">
                                {task.timestamp}
                              </p>
                              <div className="space-x-2 mt-2">
                                <button>
                                  {" "}
                                  <Link
                                    to={`/dashboard/recorded-task/${task._id}`}
                                    className="cursor-pointer"
                                  >
                                    <BiMessageSquareEdit size={25} />
                                  </Link>
                                </button>
                                <button
                                  className="cursor-pointer"
                                  onClick={() => handelDeleteTask(task._id)}
                                >
                                  <RiDeleteBack2Line
                                    size={25}
                                    className="text-red-500"
                                  />
                                </button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
            {/* Done Section */}
            <Droppable droppableId="Done">
              {(provided) => (
                <div
                  className="w-full"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h1 className="bg-green-200 text-center py-2 font-bold rounded-md">
                    Done
                  </h1>
                  <div className="my-2 space-y-3 cursor-pointer">
                    {tasks
                      .filter((task) => task.category === "Done")
                      .map((task, index) => (
                        <Draggable
                          key={task._id}
                          draggableId={task._id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-green-100 p-4 rounded-lg shadow-md"
                            >
                              <h2 className="text-lg font-semibold">
                                {task.title}
                              </h2>
                              <p className="text-sm text-gray-600">
                                {task.description}
                              </p>
                              <p className="text-xs text-gray-500">
                                {task.timestamp}
                              </p>
                              <div className="space-x-2 mt-2">
                                <button>
                                  {" "}
                                  <Link
                                    to={`/dashboard/recorded-task/${task._id}`}
                                    className="cursor-pointer"
                                  >
                                    <BiMessageSquareEdit size={25} />
                                  </Link>
                                </button>
                                <button
                                  className="cursor-pointer"
                                  onClick={() => handelDeleteTask(task._id)}
                                >
                                  <RiDeleteBack2Line
                                    size={25}
                                    className="text-red-500"
                                  />
                                </button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          </>
        ) : (
          <>
            <p className="m-5">No task add here</p>
          </>
        )}
      </div>
    </DragDropContext>
  );
};

export default Recorded;
