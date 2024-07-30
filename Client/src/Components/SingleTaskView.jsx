const SingleTaskView = ({ task, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <img
          src={task.image}
          alt={task.heading}
          className="w-full h-40 object-cover rounded-lg mb-4"
        />
        <h2 className="text-2xl font-semibold mb-2">{task.heading}</h2>
        <p className="text-gray-600 mb-4">{task.description}</p>
        <p className="text-sm text-gray-500">
          {task.date} at {task.time}
        </p>
        <button
          className="mt-4 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SingleTaskView;
