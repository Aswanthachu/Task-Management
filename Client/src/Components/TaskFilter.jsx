const TaskFilter = ({ filter, setFilter }) => {
  return (
    <div className="mb-4 w-fit">
      <label className=" text-sm font-medium text-gray-700">
        Filter by Priority:
      </label>
      <select
        className="mt-1  w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 !max-w-[200px]"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>
  );
};

export default TaskFilter;
