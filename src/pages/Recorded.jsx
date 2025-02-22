import React, { useContext } from "react";
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

  if (isLoading || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl font-semibold text-gray-300">
        Loading...
      </div>
    );
  }

  const handleDeleteTask = async (id) => {
    await axios.delete(`${import.meta.env.VITE_URL}/tasks/${id}`).then(() => {
      refetch();
    });
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const task = tasks.find((task) => task._id === draggableId);
    task.category = destination.droppableId;

    axios.put(`${import.meta.env.VITE_URL}/tasks/${draggableId}`, task).then(() => {
      refetch();
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 min-h-screen bg-gray-900 text-gray-300">
        {tasks.length > 0 ? (
          ["To-Do", "In Progress", "Done"].map((category) => (
            <Droppable key={category} droppableId={category}>
              {(provided) => (
                <div
                  className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h1
                    className={`text-center py-3 font-semibold rounded-md text-lg uppercase tracking-wide ${
                      category === "To-Do"
                        ? "bg-yellow-600 text-gray-900"
                        : category === "In Progress"
                        ? "bg-blue-600 text-white"
                        : "bg-green-600 text-white"
                    }`}
                  >
                    {category}
                  </h1>
                  <div className="mt-6 space-y-5">
                    {tasks
                      .filter((task) => task.category === category)
                      .map((task, index) => (
                        <Draggable key={task._id} draggableId={task._id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-gray-700 p-5 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-600"
                            >
                              <h2 className="text-lg font-semibold text-white">{task.title}</h2>
                              <p className="text-sm text-gray-400">{task.description}</p>
                              <p className="text-xs text-gray-500">{task.timestamp}</p>
                              <div className="flex justify-between mt-4">
                                <Link
                                  to={`/dashboard/recorded-task/${task._id}`}
                                  className="text-blue-400 hover:text-blue-500 transition duration-300"
                                >
                                  <BiMessageSquareEdit size={22} />
                                </Link>
                                <button
                                  onClick={() => handleDeleteTask(task._id)}
                                  className="text-red-400 hover:text-red-500 transition duration-300"
                                >
                                  <RiDeleteBack2Line size={22} />
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
          ))
        ) : (
          <div className="col-span-3 text-center text-gray-500 text-lg">
            No tasks available
          </div>
        )}
      </div>
    </DragDropContext>
  );
};

export default Recorded;
