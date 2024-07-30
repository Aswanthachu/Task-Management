import React, { useState } from "react";
import Header from "./Components/Header";
import TaskFilter from "./Components/TaskFilter";
import TaskList from "./Components/TaskList";
import TaskModal from "./Components/TaskModal";
import SingleTaskView from "./Components/SingleTaskView";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [viewTask, setViewTask] = useState(null);

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "All") return true;
      return task.priority === filter;
    })
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA - dateB;
    });

  const handleSaveTask = (task) => {
    if (currentTask) {
      setTasks(
        tasks.map((t) => (t.id === currentTask.id ? { ...t, ...task } : t))
      );
      const t = toast.success("Task Edited successfully.");
    } else {
      setTasks([...tasks, { ...task, id: Date.now() }]);
      const t = toast.success("Task Saved successfully.");
    }
    setIsModalOpen(false);
    setCurrentTask(null);
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (taskToEdit) {
      setCurrentTask(taskToEdit);
      setIsModalOpen(true);
    }
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    const t = toast.success("Task Deleted successfully.");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentTask(null);
  };

  return (
    <div>
      <Header setIsModalOpen={setIsModalOpen} />
      <main className="p-2 md:p-6">
        {tasks.length !== 0 && (
          <TaskFilter filter={filter} setFilter={setFilter} />
        )}
        <TaskList
          tasks={filteredTasks}
          totalTasks={tasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
        {isModalOpen && (
          <TaskModal
            isOpen={isModalOpen}
            onClose={handleCancel}
            onSave={handleSaveTask}
            task={currentTask}
          />
        )}
        {viewTask && (
          <SingleTaskView task={viewTask} onClose={() => setViewTask(null)} />
        )}
      </main>
      <Toaster />
    </div>
  );
};

export default App;
