import { FaEdit, FaTrash } from "react-icons/fa";
import NoImage from "../assets/No-Image.png";
import NoTask from "../assets/No-Task.png";
import { formatTime } from "../utils/formatTime";

const TaskList = ({ tasks, onEdit, onDelete, totalTasks }) => {
  if (totalTasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-10 md:mt-20">
        <img src={NoTask} alt="No task" className="max-w-56 md:max-w-96" />
        <p className=" text-center font-semibold -ml-5 md:-ml-10">
          No tasks are created yet.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border-t border-b border-gray-300">
        <thead>
          <tr>
            <th className="py-1 px-4 border-t border-b border-gray-300 w-2/12">
              Image
            </th>
            <th className="py-1 px-4 border border-gray-300 w-2/12">Heading</th>
            <th className="py-1 px-4 border border-gray-300 w-4/12">
              Description
            </th>
            <th className="py-1 px-4 border border-gray-300 w-1/12">Date</th>
            <th className="py-1 px-4 border border-gray-300 w-1/12">Time</th>
            <th className="py-1 px-4 border border-gray-300 w-1/12">
              Priority
            </th>
            <th className="py-1 px-4 border-t border-b border-gray-300 w-1/12">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TaskRow = ({ task, onEdit, onDelete }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      case "Low":
        return "bg-green-100 text-green-700";
      default:
        return "";
    }
  };

  return (
    <tr className="text-center">
      <td className="relative py-2 px-4 border-t border-b border-gray-300">
        <img
          src={task.image || NoImage}
          alt={task.heading}
          className="absolute inset-0 w-[95%] h-[95%] object-contain rounded-lg mx-auto"
          style={{ top: "2.5%", left: "2.5%" }}
        />
      </td>
      <td className="py-2 px-4 border border-gray-300">{task.heading}</td>
      <td className="py-2 px-4 border border-gray-300">{task.description}</td>
      <td className="py-2 px-4 border border-gray-300">{task.date}</td>
      <td className="py-2 px-4 border border-gray-300">{formatTime(task.time)}</td>
      <td
        className={`py-2 px-4 border border-gray-300 ${getPriorityColor(
          task.priority
        )}`}
      >
        {task.priority}
      </td>
      <td className="py-2 px-4 border-t border-b border-gray-300">
        <div className="flex justify-center space-x-2">
          <button
            className="text-yellow-500 hover:text-yellow-600"
            onClick={() => onEdit(task.id)}
          >
            <FaEdit />
          </button>
          <button
            className="text-red-500 hover:text-red-600"
            onClick={() => onDelete(task.id)}
          >
            <FaTrash />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TaskList;
